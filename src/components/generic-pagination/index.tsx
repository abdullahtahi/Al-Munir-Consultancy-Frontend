import { TablePagination } from '@mui/material';
import React from 'react';

interface GenericPaginationProps {
  count: number;
  page: number;
  setPage: (page:number) => void;
  rowsPerPage: number;
  setRowsPerPage: any
}

const GenericPagination: React.FC<GenericPaginationProps> = ({
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage
}) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page-1}
      defaultValue={10}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 25, 50,100,150]} // ✅ optional
    />
  );
};

export default GenericPagination;
