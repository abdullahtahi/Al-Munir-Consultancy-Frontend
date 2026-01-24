import PageContainer from '@components/layout/PageContainer';
import { Add, FilterList } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Collapse,
  Snackbar,
  Stack,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericTable from 'src/components/generic-table';
import UsersFilters from './UsersFilters';
import { baseUrl, destroy, get, post, put } from 'src/services/default';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import ConsultantDialog from './dialog/ConsultantDialog/ConsultantDialog';
import { DeleteDialog } from 'src/components/delete-dialog/DeleteDialog';
import { INACTIVE_STATUS, PENDING_STATUS } from 'src/constants/AppConstants';
import AuthorizeComponent from 'src/utils/AuthorizeComponent';
import {
  CAN_ADD_CONSULTANT,
  CAN_DELETE_CONSULTANT,
  CAN_EDIT_CONSULTANT,
} from 'src/constants/Permissions';
import { Tooltip } from '@mui/material';
import { IconLock } from '@tabler/icons-react';
import ChangePasswordDialog from './dialog/ChangePasswordDialog/ChangePasswordDialog';

interface UserData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const EirInList = () => {
  const token = useSelector(
    (state: RootState) => state?.auth?.user?.data?.accessToken
  );
  const { t } = useTranslation();
  const theme = useTheme();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [consultantDialogOpen, setConsultantModeDialogOpen] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [singleUser, setSingleUser] = useState<any>({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [consultantDialogMode, setConsultantDialogMode] = useState<
    'Add' | 'Edit'
  >('Add');
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  });
  const hanldOpenDeleteModal = (row: any) => {
    setSingleUser(row);
    setOpenDeleteModal(true);
  };
  const hanldCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenAdd = () => {
    setConsultantDialogMode('Add');
    setConsultantModeDialogOpen(true);
  };

  const handleOpenEdit = (row: any) => {
    setSingleUser(row);
    setConsultantDialogMode('Edit');
    setConsultantModeDialogOpen(true);
  };

  const handleOpenChangePassword = (row: any) => {
    setSingleUser(row);
    setChangePasswordDialogOpen(true);
  };
  const columns = [
    { key: 'id', label: 'S.No.', width: 80 },
    { key: 'firstName', label: 'First Name', width: 150 },
    { key: 'lastName', label: 'Last Name', width: 150 },
    { key: 'email', label: 'EMAIL', width: 250 },
    {
      key: 'status',
      label: 'Status',
      width: 250,
      render: (row: UserData) =>
        row.status == INACTIVE_STATUS ? (
          <Stack direction="row" spacing={1}>
            <Chip label="In Active" color="error" />
          </Stack>
        ) : row.status == PENDING_STATUS ? (
          <Stack direction="row" spacing={1}>
            <Chip label="Pending" color="warning" />
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Chip label="Active" color="success" />
          </Stack>
        ),
    },
    { key: 'level', label: 'Level', width: 250 },
    {
      key: 'edit',
      label: 'EDIT',
      align: 'center' as const,
      width: 100,
      render: (row: UserData) => (
        <AuthorizeComponent permission={CAN_EDIT_CONSULTANT}>
          <IconPencil
            onClick={() => handleOpenEdit(row)}
            style={{ cursor: 'pointer' }}
          />
        </AuthorizeComponent>
      ),
    },
    {
      key: 'delete',
      label: 'DELETE',
      align: 'center' as const,
      width: 100,
      render: (row: UserData) => (
        <AuthorizeComponent permission={CAN_DELETE_CONSULTANT}>
          <IconTrash
            onClick={() => hanldOpenDeleteModal(row)}
            style={{ cursor: 'pointer' }}
          />
        </AuthorizeComponent>
      ),
    },
    {
      key: 'changePassword',
      label: 'PASSWORD',
      align: 'center' as const,
      width: 100,
      render: (row: UserData) => (
        <AuthorizeComponent permission={CAN_EDIT_CONSULTANT}>
          <Tooltip title="Change Password">
            <IconLock
              onClick={() => handleOpenChangePassword(row)}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </AuthorizeComponent>
      ),
    },
  ];

  const getUsers = useCallback(
    async (values: any) => {
      const queryString = new URLSearchParams(values).toString();
      const users: any = await get(
        `${baseUrl}/api/v1/users?page=${page}&limit=${rowsPerPage}&${queryString}`
      );
      setUserData(users.data);
      return users;
    },
    [token, rowsPerPage, page]
  );
  const deleteImg = async () => {
    try {
      await destroy(`${baseUrl}/api/v1/users/${singleUser.id}`);
      setSnackbar({
        open: true,
        message: 'Deleted Successfull',
        severity: 'success',
      });
      hanldCloseDeleteModal();
      getUsers({});
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error',
      });
    }
  };

  const breadcrumbs = [
    { title: t('home'), to: '/' },
    { title: 'Users & Members' },
  ];

  const handleSubmit = async (values: any) => {
    try {
      if (consultantDialogMode == 'Edit') {
        const user: any = await put(
          `${baseUrl}/api/v1/users/${singleUser.id}`,
          values
        );

        setSnackbar({
          open: true,
          message: user.message || 'Updated SuccessFully',
          severity: 'success',
        });
        setConsultantModeDialogOpen(false);
      } else {
        const payload = {
          ...values,
        };
        await post(`${baseUrl}/api/v1/auth/register`, payload)
          .then((resutl: any) => {
            if (resutl.data) {
              setSnackbar({
                open: true,
                message: resutl.message || 'Register SuccessFully',
                severity: 'success',
              });
              setConsultantModeDialogOpen(false);
            } else {
              setSnackbar({
                open: true,
                message: resutl.message || '',
                severity: 'error',
              });
            }
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              message: error.message,
              severity: 'error',
            });
          });
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || error,
        severity: 'error',
      });
    }
  };

  const handleChangePasswordSubmit = async (values: any) => {
    try {
      const response: any = await put(
        `${baseUrl}/api/v1/users/${singleUser.id}/change-password`,
        values
      );

      setSnackbar({
        open: true,
        message: response.message || 'Password Changed SuccessFully',
        severity: 'success',
      });
      setChangePasswordDialogOpen(false);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to change password',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    getUsers({});
  }, [rowsPerPage, page, consultantDialogOpen]);

  return (
    <>
      <PageContainer
        heading={<span> Consultants ({userData.count})</span>}
        breadcrumbs={breadcrumbs}
        action={
          <AuthorizeComponent permission={CAN_ADD_CONSULTANT}>
            <Button
              variant="contained"
              onClick={handleOpenAdd}
              color="primary"
              size="small"
              startIcon={<Add />}
              sx={{
                '& .MuiButton-startIcon': {
                  marginRight: 0,
                },
              }}
            />
          </AuthorizeComponent>
        }
      >
        {/* Toggle Button */}
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<FilterList />}
            onClick={() => setShowFilters((prev) => !prev)}
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.getContrastText(theme.palette.primary.light),
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            {showFilters ? t('hideFilters') : t('showFilters')}
          </Button>
        </Box>

        {/* Collapsible Filters */}
        <Collapse in={showFilters} timeout="auto" unmountOnExit>
          <Box mb={2}>
            <UsersFilters getUsers={getUsers} />
          </Box>
        </Collapse>

        <Grid size={{ xs: 12 }}>
          <GenericTable
            data={userData?.rows}
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={userData?.count}
          />
        </Grid>
      </PageContainer>

      <ConsultantDialog
        open={consultantDialogOpen}
        onClose={() => setConsultantModeDialogOpen(false)}
        handleSubmit={handleSubmit}
        mode={consultantDialogMode}
        singleUser={singleUser}
      />
      <ChangePasswordDialog
        open={changePasswordDialogOpen}
        onClose={() => setChangePasswordDialogOpen(false)}
        handleSubmit={handleChangePasswordSubmit}
        singleUser={singleUser}
      />
      <DeleteDialog
        deleteImg={deleteImg}
        handleClose={hanldCloseDeleteModal}
        title="Delete Consultant"
        subText="Are you sure to delete Consultant"
        open={openDeleteModal}
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

export default EirInList;
