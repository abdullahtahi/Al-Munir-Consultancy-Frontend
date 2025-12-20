import React, { useEffect, useState } from 'react';

import { IconCaretDown, IconCaretUp, IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

import CustomCheckbox from '@components/forms/theme-elements/CustomCheckbox';
import GenericButton from '@components/generic-button';
import _ from 'lodash';


import { AssignRolePermissionConfirmationDialog } from './AssignRolePermissionConfirmationDialog';

import type { AppDispatch, RootState } from 'src/store';
// import { getAllPermissions, getPermissionsAgainstRoles } from 'src/constants/Permissions';

interface AssignRolePermissionDialogProps {
  open: boolean;
  onClose: () => void;
  roleId?: number | undefined;
  onSuccess?: () => void;
}

const AssignRolePermissionDialog: React.FC<AssignRolePermissionDialogProps> = ({
  open,
  onClose,
  onSuccess,
  roleId,
}) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const selectedDepot = useSelector((state: RootState) => state.depot.selectedDepot);

  if (!selectedDepot?.id) {
    return null;
  }

  const [permissions, setPermissions] = useState<any[]>([]);
  const [optionsGroup, setOptionsGroup] = useState<Record<number | string, any[]>>({});
  const [checkList, setCheckList] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!open || !roleId) { return; }

  //   (async () => {
  //     try {
  //       const [allPermissions, rolePermissions] = await Promise.all([
  //         getAllPermissions(selectedDepot.id),
  //         getPermissionsAgainstRoles(selectedDepot.id, roleId),
  //       ]);

  //       setPermissions(allPermissions || []);
  //       const grouped = _.groupBy(allPermissions || [], (p: any) => p.parentId ?? 'root');
  //       setOptionsGroup(grouped);

  //       const permissionIds: number[] = (rolePermissions.rows || []).map(
  //         (r: ) => r.permissionId,
  //       );
  //       setCheckList(permissionIds);
  //     } catch (error: any) {
  //       dispatch(showSnackbar({ message: error?.message || 'Failed to load permissions', severity: 'error' }));
  //     } finally {
  //       dispatch(hideLoader('permissions'));
  //     }
  //   })();
  // }, [open, roleId]);

  const handleToggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const onChildChange = (checked: boolean, permissionId: number) => {
    if (checked) { setCheckList(prev => _.uniq([...prev, permissionId])); }
    else { setCheckList(prev => prev.filter(id => id !== permissionId)); }
  };

  const checkedAll = (checked: boolean, parentId: number | string) => {
    const childIds = (optionsGroup[parentId] || []).map(c => c.id);
    if (checked) { setCheckList(prev => _.uniq([...prev, ...childIds])); }
    else { setCheckList(prev => prev.filter(id => !childIds.includes(id))); }
  };

  const checkIfChecked = (parentId: number | string) => {
    const childIds = (optionsGroup[parentId] || []).map(c => c.id);
    const included = checkList.filter(id => childIds.includes(id));
    return childIds.length > 0 && included.length === childIds.length;
  };

  const checkIfPartialChecked = (parentId: number | string) => {
    const childIds = (optionsGroup[parentId] || []).map(c => c.id);
    const included = checkList.filter(id => childIds.includes(id));
    return included.length > 0 && included.length < childIds.length;
  };

  const parents = (permissions || []).filter(p => p.moduleName === 'subModule');

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='lg'
        fullWidth={true}
        slotProps={{
          paper: {
            sx: {
              mx: { xs: 1.25, sm: 2 },
            },
          },
        }}
      >
        <DialogTitle>Roles Permissions for Depot Manager</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
          <Box my={1}>
            <Typography variant="h5" display="flex" alignItems="center" gap={1}>
              {t('appModule.permissions')}
              {/* {permissionsLoader ? (
                <CircularProgress size={20} thickness={4} />
              ) : (
                <>({checkList.length}/{permissions.length})</>
              )} */}
            </Typography>

          </Box>

          <Box
            flex={1}
            overflow="auto"
            border={1}
            borderColor="divider"
            borderRadius={1}
            p={1}
          >
            {/* {permissionsLoader ?
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                minHeight={300}
              >
                <CircularProgress size={60} />
              </Box>
              :
              <List disablePadding>
                {parents.map((permission, idx) => {
                  const parentKey = permission.id as number | string;
                  return (
                    <Box key={permission.id}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleToggleExpand(idx)}>
                          <FormControlLabel
                            control={
                              <CustomCheckbox
                                checked={checkIfChecked(parentKey)}
                                indeterminate={checkIfPartialChecked(parentKey)}
                                onChange={(_e, v) => checkedAll(v, parentKey)}
                              />
                            }
                            label={<strong>{permission.title}</strong>}
                          />
                          <Box flexGrow={1} />
                          <IconButton size="small" onClick={() => handleToggleExpand(idx)}>
                            {expanded === idx ? <IconCaretUp /> : <IconCaretDown />}
                          </IconButton>
                        </ListItemButton>
                      </ListItem>

                      <Collapse in={expanded === idx} timeout="auto" unmountOnExit>
                        <Box display="flex" flexWrap="wrap" gap={2} p={2}>
                          {(optionsGroup[parentKey] || []).map(child => (
                            <Box key={child.id} minWidth={200}>
                              <FormControlLabel
                                control={
                                  <CustomCheckbox
                                    checked={checkList.includes(child.id)}
                                    onChange={(_e, v) => onChildChange(v, child.id)}
                                  />
                                }
                                label={child.title}
                              />
                            </Box>
                          ))}
                        </Box>
                      </Collapse>
                      <Divider />
                    </Box>
                  );
                })}
              </List>
            } */}
          </Box>
        </DialogContent>

        <DialogActions>
          <GenericButton
            label={t('appModule.cancel')}
            onClick={onClose}
            color='error'
            variant='contained'
            icon={IconX}
            size='medium'
            sx={{ textTransform: 'uppercase' }}
          />
          <GenericButton
            label={t('appModule.save')}
            onClick={() => setConfirmOpen(true)}
            color='primary'
            variant='contained'
            icon={IconDeviceFloppy}
            size='medium'
            sx={{ textTransform: 'uppercase' }}
          />
        </DialogActions>
      </Dialog>

      <AssignRolePermissionConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          setExpanded(null);
          onSuccess?.();
        }}
        roleId={roleId}
        checkList={checkList}
      />
    </>
  );
};

export default AssignRolePermissionDialog;
