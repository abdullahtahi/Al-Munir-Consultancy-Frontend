import { useEffect, useState } from 'react';

import { IconPlus } from '@tabler/icons-react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import GenericTable from '@components/generic-table';
import PageContainer from '@components/layout/PageContainer';

import { getAllRoles } from 'src/api/role';

import { useRolesColumns, type RolesFiltersSchemaType } from './Constants';
import AddEditRoleDialog from './dialog/AddEditRoleDialog';
import AssignRolePermissionDialog from './dialog/AssignRolePermissionDialog';
import ChangeRoleStatusConfirmationDialog from './dialog/ChangeRoleStatusConfirmationDialog';
import RevertRoleConfirmationDialog from './dialog/RevertRoleConfirmationDialog';
import { Alert, Snackbar } from '@mui/material';

const RolesList = () => {
  // States for API response
  const [rolesData, setRolesData] = useState<any>();

  // Filters | Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dialog state
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number>();
  const [openRoleAddEditDialog, setOpenRoleAddEditDialog] =
    useState<boolean>(false);
  const [openRoleRevertDialog, setOpenRoleRevertDialog] =
    useState<boolean>(false);
  const [openRoleStatusChangeDialog, setOpenRoleStatusChangeDialog] =
    useState<boolean>(false);
  const [openAssignRolePermissionDialog, setOpenAssignRolePermissionDialog] =
    useState<boolean>(false);
  const [roleDialogMode, setRoleDialogMode] = useState<'add' | 'edit'>('add');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  });

  const breadcrumbs = [
    { title: 'Home' },
    { title: 'Settings' },
    { title: 'Roles' },
  ];

  const handleOpenAdd = () => {
    setRoleDialogMode('add');
    setOpenRoleAddEditDialog(true);
  };

  const handleEditRoleClick = (row: any) => {
    setSelectedRow(row);
    setRoleDialogMode('edit');
    setOpenRoleAddEditDialog(true);
  };

  const handleRevertRoleClick = (row: any) => {
    setSelectedRow(row);
    setOpenRoleRevertDialog(true);
  };

  const handleStatusChangeClick = (row: any) => {
    setSelectedRow(row);
    setOpenRoleStatusChangeDialog(true);
  };

  const handleRolePermissionAssignClick = (rowId: number) => {
    setSelectedRowId(rowId);
    setOpenAssignRolePermissionDialog(true);
  };

  const rolesColumns = useRolesColumns({
    onAssignPermission: handleRolePermissionAssignClick,
    onEdit: handleEditRoleClick,
    onRevert: handleRevertRoleClick,
    onStatusToggle: handleStatusChangeClick,
  });

  const fetchRolesData = async (newFilters: any) => {
    try {
      const response = await getAllRoles({
        page: page + 1,
        limit: rowsPerPage,
        ...newFilters,
      });
      console.log('response', response);
      if (response && response.data) {
        setRolesData(response.data || []);
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || error,
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    fetchRolesData({});
  }, [page, rowsPerPage]);
  return (
    <>
      <PageContainer
        heading={<span> Roles ({rolesData?.count})</span>}
        breadcrumbs={breadcrumbs}
        action={
          // <AuthorizeComponent permission={CAN_ADD_ROLE}>
          <Button
            variant="contained"
            onClick={handleOpenAdd}
            color="primary"
            size="small"
            startIcon={<IconPlus size={16} />}
            sx={{
              '& .MuiButton-startIcon': {
                marginRight: 0,
              },
            }}
          />
          //  </AuthorizeComponent>
        }
      >
        <Grid size={{ xs: 12 }}>
          <GenericTable
            data={rolesData?.rows}
            columns={rolesColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={rolesData?.count}
          />
        </Grid>
      </PageContainer>

      <AddEditRoleDialog
        open={openRoleAddEditDialog}
        title={roleDialogMode === 'add' ? 'Add' : 'Edit'}
        onClose={() => setOpenRoleAddEditDialog(false)}
        onSave={() => {
          fetchRolesData({});
          setOpenRoleAddEditDialog(false);
        }}
        mode={roleDialogMode}
        {...(selectedRow ? { selectedRow: selectedRow } : {})}
      />

      <RevertRoleConfirmationDialog
        open={openRoleRevertDialog}
        onClose={() => setOpenRoleRevertDialog(false)}
        onConfirm={() => {
          setOpenRoleRevertDialog(false);

          fetchRolesData({});
        }}
        selectedRoleRow={selectedRow}
      />

      <ChangeRoleStatusConfirmationDialog
        open={openRoleStatusChangeDialog}
        onClose={() => setOpenRoleStatusChangeDialog(false)}
        onConfirm={() => {
          setOpenRoleStatusChangeDialog(false);
        }}
        selectedRoleRow={selectedRow}
      />

      <AssignRolePermissionDialog
        open={openAssignRolePermissionDialog}
        onClose={() => setOpenAssignRolePermissionDialog(false)}
        onSuccess={() => {
          setOpenAssignRolePermissionDialog(false);
        }}
        roleId={selectedRowId}
      />

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
    </>
  );
};

export default RolesList;
