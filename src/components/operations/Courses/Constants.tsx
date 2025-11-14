import Button from '@mui/material/Button';
import {
  IconArrowBack,
  IconArrowUpRight,
  IconEyeFilled,
  IconImageInPicture,
  IconPrinter,
} from '@tabler/icons-react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import * as constants from 'src/constants/AppConstants';

interface TableColumn {
  id: string;
  label: React.ReactNode;
  align: 'left' | 'center' | 'right';
  minWidth: number;
  classNames: string;
  key: string;
  render?: (row: any, index: number) => React.ReactNode;
}

interface EirOutActionsProps {
  onPrint: (
    eirOutId: string,
    transitionId: string,
    deletedAt: string | null
  ) => void;
  onViewImage: (transitionId: string, deletedAt: string | null) => void;
  onImage: (
    eirOutId: string,
    transitionId: string,
    deletedAt: string | null
  ) => void;
  onRevert: (
    containerNumber: string,
    croNumber: string,
    serviceStatus: string,
    senderCompanyId: string,
    containerId: number,
    transitionId: number,
    pickupSlipId: number,
    eirOutId: number
  ) => void;
}

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
    render: (row) => row?.Student.studentName || '-',
  },
  {
    id: 'Class',
    label: 'Class',
    align: 'left',
    minWidth: 80,
    classNames: 'pr-0 text-nowrap',
    key: 'Student.phone',
    render: (row) => row?.Student?.phone || '-',
  },
  {
    id: 'DependOn',
    label: 'Depend On',
    align: 'left',
    minWidth: 80,
    classNames: 'pr-0 text-nowrap',
    key: 'DependOn.relation',
    render: (row) => row.DependOn.relation,
  },
  {
    id: 'feeAmount',
    label: 'feeAmount',
    align: 'left',
    minWidth: 80,
    classNames: 'pr-0 text-nowrap',
    key: 'feeAmount',
    render: (row) => row.feeAmount,
  },
  {
    id: 'admissionNumber',
    label: 'Admission Number',
    align: 'left',
    minWidth: 80,
    classNames: 'pr-0 text-nowrap',
    key: 'grade',
    render: (row) => row.admissionNumber,
  },
  {
    id: 'admissionType',
    label: 'Admission Type',
    align: 'left',
    minWidth: 80,
    classNames: 'pr-0 text-nowrap',
    key: 'grade',
    render: (row) => row.admissionType,
  },
  {
    id: 'view',
    label: 'view',
    align: 'left',
    minWidth: 10,
    classNames: 'pr-0 text-nowrap',
    key: 'view',
    render: (row) => (
      <Button
        variant="outlined"
        size="small"
        startIcon={<IconEyeFilled size={18} />}
        // onClick={() => onViewImage(row.Transition.id, row.deletedAt)}
        sx={{ minWidth: 'auto' }}
      />
    ),
  },
  // {
  //   key: 'edit',
  //   label: 'EDIT',
  //   align: 'center' as const,
  //   width: 100,
  //   render: (row: UserData) => (
  //     <IconPencil
  //       onClick={() => handleOpenEdit(row)}
  //       style={{ cursor: 'pointer' }}
  //     />
  //   ),
  // },
  // {
  //   key: 'delete',
  //   label: 'DELETE',
  //   align: 'center' as const,
  //   width: 100,
  //   render: (row: UserData) => (
  //     <IconTrash
  //       onClick={() => console.log('Delete', row)}
  //       style={{ cursor: 'pointer' }}
  //     />
  //   ),
  // },
];
