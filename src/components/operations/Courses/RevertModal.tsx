import { CheckCircle, Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as constants from 'src/constants/AppConstants';
import { getContainerGradesByAttributes, isRevertable, revertEIROut } from 'src/services/terminals';
import NotificationModal from 'src/store/NotificationModal';

type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface RevertModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void; // Simplified since we'll handle the API call here
  containerData: {
    containerNumber: string;
    croNumber: string;
    serviceStatus: string;
    senderCompanyId: string;
    containerId: number;
    transitionId: number;
    pickupSlipId: number;
    eirOutId: number;
  } | null;
}

interface ContainerGrade {
  id: string;
  grade: string;
  shippingLineId: string;
}

const RevertModal: React.FC<RevertModalProps> = ({
  open,
  onClose,
  onConfirm,
  containerData,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [grades, setGrades] = useState<ContainerGrade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    type: 'info' as NotificationType,
    title: '',
    message: '',
    showConfirm: false,
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const terminalId = 1002;

  const showNotification = (
    type: NotificationType, 
    message: string, 
    title: string = '', 
    showConfirm: boolean = false
  ) => {
    setNotification({
      open: true,
      type,
      title,
      message,
      showConfirm,
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const checkRevertibility = async () => {
    try {
      if (!containerData) return false;
      
      const response = await isRevertable(terminalId, {
        containerId: containerData.containerId,
        transitionId: containerData.transitionId
      });
      
      if (response?.data.message === 'SHIPPING_LINE_MISMATCH') {
        showNotification('error', t('container.shippingLineMismatch'));
        return 'SHIPPING_LINE_MISMATCH';
      } else if (response?.data.result === null) {
        return 'OPEN_MODEL';
      }
      showNotification('error', t('container.cannotRevert'));
      return false;
    } catch (err) {
      console.error('Error checking revertibility:', err);
      showNotification('error', t('errors.generalError'));
      return false;
    }
  };

  const handleRevertEIROut = async () => {
    if (!containerData || !selectedGradeId) return;
    
    const revertContainerData = {
      transitionId: containerData.transitionId,
      pickupSlipId: containerData.pickupSlipId,
      gradeId: selectedGradeId,
      ContainerNo: containerData.containerNumber,
      containerId: containerData.containerId,
      senderCompanyId: containerData.senderCompanyId
    };

    try {
      showNotification(
        'loading', 
        t('container.revertingInProgress'), 
        t('container.pleaseWait'),
        false
      );
      
      const response = await revertEIROut(terminalId, containerData.eirOutId, revertContainerData);
      
      if (response?.data) {
        showNotification(
          'success', 
          t('container.revertSuccess'), 
          t('common.success'),
          false
        );
        onConfirm(); // Notify parent component of successful revert
      } else {
        alert(response?.data || 'Failed to revert EIR Out');
      }
    } catch (err) {
      console.error('Error reverting EIR Out:', err);
      showNotification(
        'error', 
        t('container.revertFailed'), 
        t('common.error'),
        true
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!containerData?.senderCompanyId || !open) return;
      
      setLoading(true);
      try {
        const revertibilityStatus = await checkRevertibility();
        if (revertibilityStatus !== 'OPEN_MODEL') {
          onClose();
          return;
        }

        const result = await getContainerGradesByAttributes({
          shippingLineId: containerData.senderCompanyId,
          limit: constants.all,
          attributes: ['id', 'grade', 'shippingLineId']
        });
        
        if (result?.data?.rows) {
          setGrades(result.data.rows);
        }
      } catch (err) {
        console.error("Error loading grades:", err);
        setError(t('errors.failedToLoadGrades'));
        showNotification('error', t('errors.failedToLoadGrades'));
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setSelectedGrade('');
      setSelectedGradeId('');
      setError('');
      fetchData();
    }
  }, [containerData, open, t, onClose]);

  const handleGradeChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const selectedGradeObj = grades.find(grade => grade.grade === selectedValue);
    
    setSelectedGrade(selectedValue);
    setSelectedGradeId(selectedGradeObj?.id || '');
    setError('');
  };

  const handleSubmitClick = () => {
    if (!selectedGrade) {
      setError(t('errors.gradeRequired'));
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmRevert = async () => {
    setShowConfirmDialog(false);
    await handleRevertEIROut();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('eirOut.revertConfirmation')}</DialogTitle>
        <DialogContent>
          {containerData && (
            <Box mb={3}>
              <Box pl={2}>
                <Typography variant="body1">
                  <strong>{t('eirOut.containerNumber')}:</strong> {containerData.containerNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>{t('eirOut.croNumber')}:</strong> {containerData.croNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>{t('eirOut.serviceStatus')}:</strong> {containerData.serviceStatus}
                </Typography>
                
                <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
                  <InputLabel id="grade-select-label">{t('eirOut.grade')}</InputLabel>
                  <Select
                    labelId="grade-select-label"
                    id="grade-select"
                    value={selectedGrade}
                    label={t('eirOut.grade')}
                    onChange={handleGradeChange}
                    disabled={loading || grades.length === 0}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>{t('common.select')}</em>
                    </MenuItem>
                    {grades.map((grade) => (
                      <MenuItem key={grade.id} value={grade.grade}>
                        {grade.grade}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" startIcon={<Close />}>
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleSubmitClick} 
            color="primary" 
            variant="contained"
            disabled={loading || !selectedGrade}
            startIcon={<CheckCircle />}
          >
            {t('common.submit')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('Revert Container')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Are you sure you want to revert this container?')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowConfirmDialog(false)} 
            color="secondary"
          >
            {t('common.disagree')}
          </Button>
          <Button 
            onClick={handleConfirmRevert} 
            color="primary" 
            variant="contained"
          >
            {t('common.agree')}
          </Button>
        </DialogActions>
      </Dialog>

      <NotificationModal
        open={notification.open}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        showConfirmButton={notification.showConfirm}
        confirmButtonText={t('common.retry')}
        onConfirm={handleConfirmRevert}
      />
    </>
  );
};

export default RevertModal;