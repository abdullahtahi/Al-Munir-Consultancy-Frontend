import React, { useState } from 'react';

import { IconDotsVertical, IconEye, IconLayoutBoard, IconPencil, IconRotate } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { CAN_DEACTIVATE_ROLE, CAN_DELETE_ROLE, CAN_EDIT_ROLE, CAN_VIEW_ROLE_DASHBOARD } from 'src/constants/Permissions';



interface RolesTableColumn {
  id: string;
  label: React.ReactNode;
  align: 'left' | 'center' | 'right';
  minWidth: number;
  classNames: string;
  key: string;
  render?: (row: any, index: number) => React.ReactNode;
}

interface RolesColumnGradeProps {
  onAssignPermission: (rowId: number) => void;
  onEdit: (row: any) => void;
  onRevert: (row: any) => void;
  onStatusToggle: (row: any) => void;
}

export const useRolesColumns = ({ onAssignPermission, onEdit, onRevert, onStatusToggle }: RolesColumnGradeProps) => {
  const { t } = useTranslation();

  const ActionMenu = ({ row }: { row: any }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const theme = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const actions: any[] = [
      {
        permission: CAN_VIEW_ROLE_DASHBOARD,
        key: 'view_role',
        title: t('appModule.viewRole'),
        icon: <IconLayoutBoard size={22} />,
        onClick: () => onAssignPermission(row?.id),
      },
      {
        permission: CAN_EDIT_ROLE,
        key: 'edit_role',
        title: t('appModule.edit'),
        icon: <IconPencil size={22} />,
        onClick: () => onEdit(row),
      },
      {
        permission: CAN_DELETE_ROLE,
        key: 'revert_role',
        title: t('appModule.revert'),
        icon: <IconRotate size={22} />,
        onClick: () => onRevert(row),
      },
      {
        permission: CAN_DEACTIVATE_ROLE,
        key: 'toggle_status_role',
        title: row.isActive === true
          ? t('role.deactivate')
          : t('role.activate'),
        icon: <IconEye size={22} color={row.isActive === true ? 'red' : 'green'} />,
        onClick: () => onStatusToggle(row),
      },
    ];

    return (
      <>
        <IconButton onClick={handleClick}>
          <IconDotsVertical size={22} stroke={1.5} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="eirin-actions"
        >
          <Stack direction="row" spacing={2} px={1}>
            {actions.map(({ key, title, icon, onClick, disabled }) => (
              <Tooltip title={title} key={key}>
                <IconButton
                  onClick={() => {
                    if (!disabled) {
                      onClick();
                      handleClose();
                    }
                  }}
                  sx={{
                    color: disabled
                      ? theme.palette.action.disabled
                      : theme.palette.primary.dark,
                  }}
                  disabled={!!disabled}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Menu>
      </>
    );
  };

  const rolesColumns: RolesTableColumn[] = [
    {
      id: '1',
      label: t('appModule.sNo'),
      align: 'left',
      minWidth: 50,
      classNames: 'pr-0',
      key: 'sNo',
      render: (_, index) => index + 1,
    },
    {
      id: '2',
      label: t('appModule.role'),
      align: 'left',
      minWidth: 150,
      classNames: 'pr-0',
      key: 'image',
      render: (row) => row?.role || '-',
    },
    {
      id: '3',
      label: t('appModule.description'),
      align: 'left',
      minWidth: 150,
      classNames: 'pr-0',
      key: 'description',
      render: (row) => row?.description || '-',
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      minWidth: 50,
      classNames: 'pr-0 text-nowrap',
      key: 'actions',
      render: (row) => <ActionMenu row={row} />,
    },
  ];

  return rolesColumns;
};

export interface RolesFilters {
  page: number;
  limit: number;
}

export const rolesFiltersSchema: RolesFilters = {
  page: 1,
  limit: 20,
};

export type RolesFiltersSchemaType = typeof rolesFiltersSchema;