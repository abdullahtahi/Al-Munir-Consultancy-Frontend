import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import GenericButton from '@components/generic-button';
// import { showSnackbar } from '@store/slices/snackbarSlice';

import { deleteRole } from 'src/api/role';

import type { AppDispatch, RootState } from 'src/store';
// import type { any } from 'src/types/components/users';

interface RevertRoleConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedRoleRow: any | null;
  isLoading?: boolean;
}

const RevertRoleConfirmationDialog: React.FC<RevertRoleConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  selectedRoleRow,
  // isLoading,
}) => {
  const { t } = useTranslation();
  // const dispatch: AppDispatch = useDispatch();
  // const selectedDepot = useSelector((state: RootState) => state.depot.selectedDepot);
  // if (!selectedDepot?.id) {
  //   dispatch(openDialog('No depot selected. Please select a depot first.'));
  //   return null;
  // }
  // const [snackbar, setSnackbar] = useState({
  //   open: false,
  //   message: '',
  //   severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  // });


  const handleAgreeRevertClick = async () => {
    if (!selectedRoleRow) { return; }
    try {
      // dispatch(showLoader('revertRole'));
      const response = await deleteRole(selectedRoleRow?.id);
      if (response && response.resStatus === 200) {
        // dispatch(showSnackbar({ message: 'Role deleted successfully', severity: 'success' }));
        onConfirm?.();
      }
    } catch (error: any) {
      console.error(error);
      // setSnackbar({
      //   open: true,
      //   message: error?.message || '',
      //   severity: 'error',
      // })
    } finally {
      // dispatch(hideLoader('revertRole'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {t('role.delete')}
      </DialogTitle>
      <DialogContent>{t('appModule.revertMessage')}</DialogContent>
      <DialogActions>
        <GenericButton
          label="Disagree"
          onClick={onClose}
          color="error"
          size='medium'
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        />
        <GenericButton
          label="Agree"
          onClick={handleAgreeRevertClick}
          color="primary"
          size='medium'
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default RevertRoleConfirmationDialog;
