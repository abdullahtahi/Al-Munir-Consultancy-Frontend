import { useCallback, useEffect, useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

import GenericTable from '@components/generic-table';
import PageContainer from '@components/layout/PageContainer';

import { getAllRoles } from 'src/api/role';

import { rolesFiltersSchema, useRolesColumns, type RolesFiltersSchemaType } from './Constants';
import AddEditRoleDialog from './dialog/AddEditRoleDialog';
import AssignRolePermissionDialog from './dialog/AssignRolePermissionDialog';
import ChangeRoleStatusConfirmationDialog from './dialog/ChangeRoleStatusConfirmationDialog';
import RevertRoleConfirmationDialog from './dialog/RevertRoleConfirmationDialog';
// import AuthorizeComponent from 'src/utils/AuthorizeComponent';
// import { get } from 'https';
// import { baseUrl } from 'src/services/default';

const RolesList = () => {
  const { t } = useTranslation();

  // States for API response
  const [rolesData, setRolesData] = useState<any>();

  // Filters | Pagination
  const [filters, setFilters] = useState<RolesFiltersSchemaType>(rolesFiltersSchema);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Dialog state
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number>();
  const [openRoleAddEditDialog, setOpenRoleAddEditDialog] = useState<boolean>(false);
  const [openRoleRevertDialog, setOpenRoleRevertDialog] = useState<boolean>(false);
  const [openRoleStatusChangeDialog, setOpenRoleStatusChangeDialog] = useState<boolean>(false);
  const [openAssignRolePermissionDialog, setOpenAssignRolePermissionDialog] = useState<boolean>(false);
  const [roleDialogMode, setRoleDialogMode] = useState<'add' | 'edit'>('add');



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
        ...newFilters
      });
      
      if (response && response.data) {
        setRolesData(response.data.data || []);
      }

    } catch (error: any) {
      console.error(error);
      // dispatch(showSnackbar({ message: error?.message, severity: 'error' }));
    } finally {
      // dispatch(hideLoader('allRoles'));
    }
  };

  const handleFiltersChange = useCallback((newFilters: RolesFiltersSchemaType) => {
    setFilters(newFilters);
    setPage(0);
  }, [filters]);

  useEffect(() => {
    fetchRolesData(filters);
  }, [page, rowsPerPage, filters]);

  return (
    <>
      <PageContainer
        heading={
          <span> Roles {rolesData?.count}
          </span>
        }
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
          // </AuthorizeComponent>
        }
      >
        <Grid size={{ xs: 12 }}>

          <GenericTable
            title="Roles"
            data={rolesData?.rows}
            columns={rolesColumns}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={rolesData?.count}
          />
        </Grid>
      </PageContainer>

      <AddEditRoleDialog
        open={openRoleAddEditDialog}
        title={roleDialogMode === 'add' ? "Add" : "Edit"}
        onClose={() => setOpenRoleAddEditDialog(false)}
        onSave={() => {
          setOpenRoleAddEditDialog(false);
          handleFiltersChange(filters);
        }}
        mode={roleDialogMode}
        {...(selectedRow
          ? { selectedRow: selectedRow }
          : {})}
      />

      <RevertRoleConfirmationDialog
        open={openRoleRevertDialog}
        onClose={() => setOpenRoleRevertDialog(false)}
        onConfirm={() => {
          setOpenRoleRevertDialog(false);
          handleFiltersChange(filters);
        }}
        selectedRoleRow={selectedRow}
      />

      <ChangeRoleStatusConfirmationDialog
        open={openRoleStatusChangeDialog}
        onClose={() => setOpenRoleStatusChangeDialog(false)}
        onConfirm={() => {
          setOpenRoleStatusChangeDialog(false);
          handleFiltersChange(filters);
        }}
        selectedRoleRow={selectedRow}
      />

      <AssignRolePermissionDialog
        open={openAssignRolePermissionDialog}
        onClose={() => setOpenAssignRolePermissionDialog(false)}
        onSuccess={() => {
          setOpenAssignRolePermissionDialog(false);
          handleFiltersChange(filters);
        }}
        roleId={selectedRowId}
      />

    </>
  );
};

export default RolesList;
