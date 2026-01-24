// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import welcomeImg from 'src/assets/images/backgrounds/welcome-bg2.png';

const WelcomeCard = ({ authUser, statsInfo }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}
    >
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid
            display="flex"
            alignItems="center"
            size={{
              sm: 6,
            }}
          >
            <Box>
              <Box
                gap="16px"
                mb={5}
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex',
                  },
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={authUser?.data?.profile}
                  alt="img"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="h5" whiteSpace="nowrap">
                  Welcome back{' '}
                  {authUser?.data?.firstName + ' ' + authUser?.data?.lastName}!
                </Typography>
              </Box>

              <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                divider={
                  <Divider
                    orientation={isMobile ? 'horizontal' : 'vertical'}
                    flexItem
                  />
                }
                flexWrap="wrap"
              >
                {[
                  { value: authUser?.data?.level, label: 'Level' },
                  {
                    value: statsInfo?.totalEarned,
                    label: 'Total Earnings',
                  },
                  {
                    value: statsInfo?.availableBalance,
                    label: 'Available Balance',
                  },
                  {
                    value: authUser?.data?.withdrawnAmount,
                    label: 'Withdrawn Amount',
                  },
                ].map((item, index) => (
                  <Box key={index} minWidth={120}>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                      whiteSpace="nowrap"
                    >
                      {item.value}
                    </Typography>
                    <Typography variant="subtitle2" whiteSpace="nowrap">
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
          <Grid
            size={{
              sm: 6,
            }}
          >
            <Box mb="-88px" textAlign="right">
              <img src={welcomeImg} alt={welcomeImg} width={'300px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
