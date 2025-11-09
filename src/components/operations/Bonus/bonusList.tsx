import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {  FilterList } from '@mui/icons-material';
import { IconEye } from '@tabler/icons-react';

import { Alert, Box, Button, Collapse, Snackbar, Typography, useTheme } from '@mui/material';
import PageContainer from '@components/layout/PageContainer';
import GenericTable from 'src/components/generic-table';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { baseUrl, get } from 'src/services/default';
import BonusFilters from './bonusFilters';
import ViewBonusDialog from './dialog/ViewBonusDialog';

interface TableColumn {
  id: string;
  label: React.ReactNode;
  align: 'left' | 'center' | 'right';
  minWidth: number;
  classNames: string;
  key: string;
  render?: (row: any, index: number) => React.ReactNode;
}

const BonusList: React.FC = () => {
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
  const [bonusData, setBonusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Add/Edit dialog state
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);


  const handleOpenModal = (row: any) => {
    setSingleUser(row);
    setBonusDialogOpen(true);
  };
  const hanldBonusCloseModal = () => setBonusDialogOpen(false);


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
      id: 'studentName',
      label: 'Student Name',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'Student.studentName',
      render: (row) => row?.admission?.Student?.studentName || '-',
    },
    {
      id: 'Class',
      label: 'Consultant',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'Student.phone',
      render: (row) => row?.fkConsultant?.firstName +" " +row?.fkConsultant?.lastName || '-',
    },
    {
      id: 'DependOn',
      label: 'Consultant From',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'DependOn.relation',
      render: (row) => row?.fkFromConsultant?.firstName +" " +row?.fkFromConsultant?.lastName || '-',
    },
    {
      id: 'feeAmount',
      label: 'Bonus Type',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'feeAmount',
      render: (row) =><Typography sx={{fontWeight:600,textTransform:"capitalize"}}>{ row?.bonusType.replace(/_/g, " ")}</Typography>,
    },
    {
      id: 'admissionNumber',
      label: 'Transfer Amount',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'grade',
      render: (row) => row.amount +".RS",
    },
    {
      id: 'admissionType',
      label: 'Base Amount',
      align: 'left',
      minWidth: 80,
      classNames: 'pr-0 text-nowrap',
      key: 'grade',
      render: (row) => row.baseAmount +".RS",
    },
    {
      id: 'Edit',
      label: 'View',
      align: 'left',
      minWidth: 10,
      classNames: 'pr-0 text-nowrap',
      key: 'Edit',
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<IconEye
            size={18} />}
          onClick={() => handleOpenModal(row)}
          sx={{ minWidth: 'auto' }}
        />
      ),
    }
  ];

  const getBonus = useCallback(
    async (values: any) => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(values).toString();
        const admissions: any = await get(
          `${baseUrl}/api/v1/bonuses?page=${page}&limit=${rowsPerPage}&${queryString}`
        );
        if(admissions.data){
          setBonusData(admissions.data.rows);
          setTotalCount(admissions.data.count);
        } else{
          setSnackbar({
          open: true,
          message: admissions.message || '',
          severity: 'error',
        })
      }
      console.log("admissions",admissions)

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

  useEffect(() => {
    getBonus({});
  }, [rowsPerPage, page, bonusDialogOpen]);

  return (
    <>
      <PageContainer
        heading={<span>Bonus ({totalCount})</span>}
        breadcrumbs={[
          { title: t('home'), to: '/' },
          { title: t('Bonus'), to: '/bonus' },
        ]}
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
            <BonusFilters
            getBonus={getBonus}
            />
          </Box>
        </Collapse>

        <Box width="100%" overflow="auto">
          <Box minWidth="1200px">
            <GenericTable
              data={bonusData}
              columns={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              totalCount={totalCount}
              isLoading={loading}
            />
          </Box>
        </Box>
      </PageContainer>
      <ViewBonusDialog
       open={bonusDialogOpen}
  onClose={hanldBonusCloseModal}
       singleUser={singleUser}
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

export default BonusList;
