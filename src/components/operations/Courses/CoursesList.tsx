import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Add, FilterList } from '@mui/icons-material';
import { IconPencil, IconTrash } from '@tabler/icons-react';

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
import PageContainer from '@components/layout/PageContainer';
import GenericTable from 'src/components/generic-table';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { baseUrl, destroy, get, post, put } from 'src/services/default';
import AdmissionsFilter from './CoursesFilters';
import NewCoursesDialog from './dialog/NewCoursesDialog';
import { DeleteDialog } from 'src/components/delete-dialog/DeleteDialog';
import Grid from '@mui/material/Grid2';
interface TableColumn {
  id: string;
  label: React.ReactNode;
  align: 'left' | 'center' | 'right';
  minWidth: number;
  classNames: string;
  key: string;
  render?: (row: any, index: number) => React.ReactNode;
}

const CoursesList: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [singleUser, setSingleUser] = useState<any>({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  });
  const token = useSelector(
    (state: RootState) => state?.auth?.user?.data?.accessToken
  );

  // State
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [branchData, setBranchData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Add/Edit dialog state
  const [courseDialogOpen, setCourseOpenDialog] = useState(false);
  const [courseDialogMode, setCourseDialogMode] = useState<'Add' | 'Edit'>(
    'Add'
  );

  const hanldOpenDeleteModal = (row: any) => {
    setSingleUser(row);
    setOpenDeleteModal(true);
  };
  const hanldCloseDeleteModal = () => setOpenDeleteModal(false);

  const columns: TableColumn[] = [
    {
      id: 'S.No',
      label: 'S.No',
      align: 'left',
      minWidth: 30,
      classNames: 'pr-0',
      key: 'sNo',
      render: (_, index) => index + 1,
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'Student.studentName',
      render: (row) => row?.name || '-',
    },
    {
      id: 'isActive',
      label: 'status',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'status',
      render: (row: any) =>
        row.isActive == true ? (
          <Stack direction="row" spacing={1}>
            <Chip label="Active" color="success" />
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Chip label="In Active" color="error" />
          </Stack>
        ),
    },

    {
      id: 'Edit',
      label: 'Edit',
      align: 'left',
      minWidth: 10,
      classNames: 'pr-0 text-nowrap',
      key: 'Edit',
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<IconPencil size={18} />}
          onClick={() => handleOpenEdit(row)}
          sx={{ minWidth: 'auto' }}
        />
      ),
    },
    {
      id: 'Delete',
      label: 'Delete',
      align: 'left',
      minWidth: 10,
      classNames: 'pr-0 text-nowrap',
      key: 'Edit',
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<IconTrash size={18} />}
          onClick={() => hanldOpenDeleteModal(row)}
          sx={{ minWidth: 'auto' }}
        />
      ),
    },
  ];

  const handleOpenEdit = (row: any) => {
    setSingleUser(row);
    setCourseDialogMode('Edit');
    setCourseOpenDialog(true);
  };

  const getCourses = useCallback(
    async (values: any) => {
      try {
        setLoading(true);
        console.log('values', values);
        const queryString = new URLSearchParams(values).toString();
        const admissions: any = await get(
          `${baseUrl}/api/v1/courses?page=${page}&limit=${rowsPerPage}&${queryString}`
        );
        if (admissions.data) {
          setBranchData(admissions.data.rows);
          setTotalCount(admissions.data.count);
        } else {
          setSnackbar({
            open: true,
            message: admissions.message || '',
            severity: 'error',
          });
        }
        return admissions;
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.message || error,
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [token, rowsPerPage, page]
  );
  const handleSubmit = async (values: any) => {
    try {
      if (courseDialogMode == 'Edit') {
        const { isActive, ...rest } = values;
        console.log('');
        const user: any = await put(
          `${baseUrl}/api/v1/courses/${singleUser.id}`,
          { ...rest, isActive: isActive == 'Active' ? true : false }
        );

        setSnackbar({
          open: true,
          message: user.message || 'Updated SuccessFully',
          severity: 'success',
        });
      } else {
        const courses: any = await post(`${baseUrl}/api/v1/courses`, values);
        console.log('courses', courses);
        setSnackbar({
          open: true,
          message: courses.message || 'Course Created SuccessFully',
          severity: 'success',
        });
      }

      setCourseOpenDialog(false);
    } catch (error: any) {
      error.map((row: any) => {
        setSnackbar({
          open: true,
          message: row.message,
          severity: 'error',
        });
      });
    }
  };

  const deleteImg = async () => {
    try {
      await destroy(`${baseUrl}/api/v1/courses/${singleUser.id}`);
      setSnackbar({
        open: true,
        message: 'Deleted Successfull',
        severity: 'success',
      });
      hanldCloseDeleteModal();
      getCourses({});
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error',
      });
    }
  };
  useEffect(() => {
    getCourses({});
  }, [rowsPerPage, page, courseDialogOpen]);

  return (
    <>
      <PageContainer
        heading={<span>Courses ({totalCount})</span>}
        breadcrumbs={[
          { title: t('home'), to: '/' },
          { title: t('Admissions'), to: '/admissions' },
        ]}
        action={
          <Button
            variant="contained"
            onClick={() => {
              setCourseDialogMode('Add');
              setCourseOpenDialog(true);
            }}
            color="primary"
            size="small"
            startIcon={<Add />}
            sx={{ '& .MuiButton-startIcon': { marginRight: 0 } }}
          />
        }
      >
        <Box display="flex" justifyContent="flex-end" mb={1} width="100%">
          <Button
            variant="contained"
            size="small"
            startIcon={<FilterList />}
            onClick={() => setShowFilters((prev) => !prev)}
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.getContrastText(theme.palette.primary.light),
              '&:hover': { backgroundColor: theme.palette.primary.main },
            }}
          >
            {showFilters ? t('hideFilters') : t('showFilters')}
          </Button>
        </Box>

        <Collapse in={showFilters} timeout="auto" unmountOnExit>
          <Box mb={2} width="100%">
            <AdmissionsFilter getCourses={getCourses} />
          </Box>
        </Collapse>

        <Grid size={12}>
          <GenericTable
            data={branchData}
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={totalCount}
            isLoading={loading}
          />
        </Grid>
      </PageContainer>

      <NewCoursesDialog
        open={courseDialogOpen}
        onClose={() => setCourseOpenDialog(false)}
        handleSubmit={handleSubmit}
        mode={courseDialogMode}
        singleUser={singleUser}
      />
      <DeleteDialog
        deleteImg={deleteImg}
        handleClose={hanldCloseDeleteModal}
        title="Delete Admission"
        subText="Are you sure to delete Admission"
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

export default CoursesList;
