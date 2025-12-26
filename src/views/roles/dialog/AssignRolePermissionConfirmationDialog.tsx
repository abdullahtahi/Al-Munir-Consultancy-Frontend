import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GenericButton from '@components/generic-button';
import { assignPermissionsToRole } from 'src/api/rolePermission';

interface AssignRolePermissionConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  checkList: number[];
  roleId?: number | undefined;
  onConfirm?: () => void;
}

export const AssignRolePermissionConfirmationDialog: React.FC<AssignRolePermissionConfirmationDialogProps> = ({
  open,
  onClose,
  checkList,
  roleId,
  onConfirm,
}) => {
  const { t } = useTranslation();

  const handleAgreeClick = async (): Promise<void> => {
    if (!roleId) { return; }
    try {
      const response = await assignPermissionsToRole({ 
        roleId, 
        permissionIds: checkList 
      });

      if (response && response.data) {
        onConfirm?.();
      }
    } catch (error: any) {
      console.error('Failed to update permissions', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>User Roles</DialogTitle>
      <DialogContent>
        <Box>are you sure you save the changes</Box>
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