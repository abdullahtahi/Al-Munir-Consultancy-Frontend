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
import { Alert, Snackbar } from '@mui/material';
// import type { any } from 'src/types/components/users';

interface RevertRoleConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedRoleRow: any | null;
  isLoading?: boolean;
}

const RevertRoleConfirmationDialog: React.FC<
  RevertRoleConfirmationDialogProps
> = ({
  open,
  onClose,
  onConfirm,
  selectedRoleRow,
  // isLoading,
}) => {
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  });

  const handleAgreeRevertClick = async () => {
    if (!selectedRoleRow) {
      return;
    }
    try {
      const response = await deleteRole(selectedRoleRow?.id);
      if (response) {
        onConfirm();
      }
    } catch (error: any) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error?.message || '',
        severity: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Role Delete</DialogTitle>
      <DialogContent>Are you agree to Delete it</DialogContent>
      <DialogActions>
        <GenericButton
          label="Disagree"
          onClick={onClose}
          color="error"
          size="medium"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        />
        <GenericButton
          label="Agree"
          onClick={handleAgreeRevertClick}
          color="primary"
          size="medium"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        />
      </DialogActions>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default RevertRoleConfirmationDialog;
