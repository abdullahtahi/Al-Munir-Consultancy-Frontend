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
import { UserTeamStructure } from 'src/api/dashboard/dashboard';
import { BASE_URL } from 'src/constants/AppConstants';

const TeamStructure = ({ teamMember }: any) => {
  const [res, setRes] = useState<any>();
  return (
    <DashboardCard title="Team Members" subtitle="All Team Member">
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
            {teamMember?.length > 0 &&
              teamMember.map((basic: any) => (
                <TableRow key={basic.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        src={`${BASE_URL + '/' + basic.profile}`}
                        alt={`${BASE_URL + '/' + basic.profile}`}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {basic.firstName + ' ' + basic.lastName}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          fontSize="12px"
                          variant="subtitle2"
                        >
                          {basic.role == 'user' ? 'Consultant' : basic.role}
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
                      {basic.level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* <Chip chipcolor={basic.status == 'Active' ? 'success' : basic.status == 'Pending' ? 'warning' : basic.status == 'Completed' ? 'primary' : basic.status == 'Cancel' ? 'error' : 'secondary'} */}
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
                      label={basic.totalEarnings + ' .Rs'}
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

export default TeamStructure;
