
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import GenericButton from '@components/generic-button';
// import { openDialog } from '@store/slices/globalDepotDialogSlice';
// import { hideLoader, showLoader } from '@store/slices/loaderSlice';
// import { showSnackbar } from '@store/slices/snackbarSlice';

// import { updatePermissionsAgainstRoles } from '@api/permissions';

import type { AppDispatch, RootState } from 'src/store';

interface AssignRolePermissionConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  checkList: number[];
  roleId?: number | undefined;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export const AssignRolePermissionConfirmationDialog: React.FC<AssignRolePermissionConfirmationDialogProps> = ({
  open,
  onClose,
  checkList,
  roleId,
  onConfirm,
  isLoading,
}) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const selectedDepot = useSelector((state: RootState) => state.depot.selectedDepot);
  if (!selectedDepot?.id) {
    // dispatch(openDialog('No depot selected. Please select a depot first.'));
    return null;
  }

  const handleAgreeClick = async (): Promise<void> => {
    if (!roleId) { return; }
    // dispatch(showLoader('updatePermission'));
    try {
      const params = { rolePermission: checkList.map(v => ({ permissionId: v })) };
      // const response = await updatePermissionsAgainstRoles(selectedDepot?.id, roleId, params);

      // if (response.resStatus && response.resStatus >= 400) {
        // dispatch(showSnackbar({ message: response.message || 'Failed to update permissions', severity: 'error' }));
      // } else {
        // dispatch(showSnackbar({ message: 'Permission assigned successfully!', severity: 'success' }));
        // onConfirm?.();
      // }
    } catch (error: any) {
      // dispatch(showSnackbar({ message: error.message || t('appModule.genericError'), severity: 'error' }));
    } finally {
      // dispatch(hideLoader('updatePermission'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t('user.saveRoles')}</DialogTitle>
      <DialogContent>
        <Box>{t('appModule.saveChanges')}</Box>
      </DialogContent>
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
          onClick={handleAgreeClick}
          color="primary"
          size='medium'
          variant="contained"
          sx={{ textTransform: 'uppercase' }}
        />
      </DialogActions>
    </Dialog>
  );
};