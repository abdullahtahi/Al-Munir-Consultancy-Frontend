import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';
import React from 'react';
import GenericPagination from '../generic-pagination';
import BlankCard from '../shared/BlankCard';

type Align = 'left' | 'right' | 'center';

export type Column<T> = {
  key: keyof T | string;
  label: ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: Align;
  sx?: object;
  width?: string | number;
  minWidth?: string | number;
  permission?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  title?: string;
  page?: number;
  setPage: (page: number) => void;
  rowsPerPage?: number;
  setRowsPerPage: any;
  totalCount?: number;
  isLoading?: boolean;
};

const GenericTable = <T extends object>({
  columns,
  data,
  title,
  page = 0,
  setPage,
  rowsPerPage = 10,
  setRowsPerPage,
  totalCount,
  isLoading = false,
}: Props<T>) => {
  const theme = useTheme();

  return (
    <BlankCard>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              {columns.map((col) => (
                <TableCell
                  key={col.key.toString()}
                  align={col.align || 'left'}
                  sx={{
                    color: theme.palette.getContrastText(
                      theme.palette.primary.light
                    ),
                    fontWeight: 'bold',
                    minWidth: col.minWidth,
                    width: col.width,
                    ...col.sx,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // ✅ Loading row
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            ) : data && data?.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key.toString()}
                      align={col.align || 'left'}
                      sx={{ width: col.width, ...col.sx }}
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : (row[col.key as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // ✅ No records
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4, color: theme.palette.text.secondary }}
                >
                  {`No ${title || 'records'}`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <GenericPagination
        count={totalCount ? totalCount : data && data?.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </BlankCard>
  );
};

export default GenericTable;
