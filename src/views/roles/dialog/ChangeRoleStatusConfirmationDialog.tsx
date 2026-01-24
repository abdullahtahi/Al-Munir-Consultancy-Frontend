import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import GenericButton from '@components/generic-button';

// import { toggleRoleStatus } from '@api/users';

import type { AppDispatch, RootState } from 'src/store';
// import type { IRoleResponseRow } from 'src/types/components/users';

interface ChangeRoleStatusConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedRoleRow: any | null;
  isLoading?: boolean;
}

const ChangeRoleStatusConfirmationDialog: React.FC<
  ChangeRoleStatusConfirmationDialogProps
> = ({ open, onClose, onConfirm, selectedRoleRow, isLoading }) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  if (!selectedDepot?.id) {
    // dispatch(openDialog('No depot selected. Please select a depot first.'));
    return null;
  }

  // const changeStatusRoleLoader = useSelector((state: RootState) => state.loader.actions['changeStatusRole']);

  const handleAgreeStatusChangeClick = async () => {
    if (!selectedRoleRow) {
      return;
    }
    try {
      // dispatch(showLoader('changeStatusRole'));
      // const response = await toggleRoleStatus(selectedDepot?.id, selectedRoleRow?.id);
      // if (response?.id) {
      // dispatch(showSnackbar({
      //   message: selectedRoleRow?.isActive
      //     ? t('role.deactivatedSuccessfully')
      //     : t('role.activatedSuccessfully'),
      //   severity: 'success',
      // }));
      // onConfirm?.();
      // }
    } catch (error: any) {
      // dispatch(showSnackbar({ message: error?.message || t('appModule.genericError'), severity: 'error' }));
    } finally {
      // dispatch(hideLoader('changeStatusRole'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {selectedRoleRow?.isActive ? t('role.deactivate') : t('role.activate')}
      </DialogTitle>
      <DialogContent>{t('appModule.revertMessage')}</DialogContent>
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
          onClick={handleAgreeStatusChangeClick}
          color="primary"
          size="medium"
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ChangeRoleStatusConfirmationDialog;
