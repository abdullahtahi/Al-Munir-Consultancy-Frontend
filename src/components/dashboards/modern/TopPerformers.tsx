// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import DashboardCard from '../../shared-main/DashboardCard';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TableContainer,
  Stack,
} from '@mui/material';
import TopPerformerData from './TopPerformerData';
import { topEarner } from 'src/api/dashboard/dashboard';
import { BASE_URL } from 'src/constants/AppConstants';

const performers = TopPerformerData;

const TopPerformers = () => {
  const [res, setRes] = useState<any>();

  const cardTopEarner = async () => {
    try {
      const response: any = await topEarner();

      setRes(response.data);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cardTopEarner();
  }, []);
  return (
    <DashboardCard title="Top Earner" subtitle="Consultant with Good Bonus">
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Consultant
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  level
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Balance
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {res?.length > 0 &&
              res.map((basic: any) => (
                <TableRow key={basic.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        src={`${BASE_URL + '/' + basic?.fkConsultant?.profile}`}
                        alt={`${BASE_URL + '/' + basic?.fkConsultant?.profile}`}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {basic?.fkConsultant?.firstName +
                            ' ' +
                            basic?.fkConsultant?.lastName}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          fontSize="12px"
                          variant="subtitle2"
                        >
                          {basic?.fkConsultant?.role}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {basic?.fkConsultant?.level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        bgcolor:
                          basic.status === 'High'
                            ? (theme) => theme.palette.error.light
                            : basic.status === 'Medium'
                              ? (theme) => theme.palette.warning.light
                              : basic.status === 'Low'
                                ? (theme) => theme.palette.success.light
                                : (theme) => theme.palette.secondary.light,
                        color:
                          basic.status === 'High'
                            ? (theme) => theme.palette.error.main
                            : basic.status === 'Medium'
                              ? (theme) => theme.palette.warning.main
                              : basic.status === 'Low'
                                ? (theme) => theme.palette.success.main
                                : (theme) => theme.palette.secondary.main,
                        borderRadius: '8px',
                      }}
                      size="small"
                      label={basic.totalBonus + ' .Rs'}
                    />
                  </TableCell>
                  {/* <TableCell>
                  <Typography variant="subtitle2">${basic.budget}k</Typography>
                </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopPerformers;
