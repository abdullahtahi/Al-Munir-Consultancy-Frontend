import { Box, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import icon1 from '../../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';
import { useEffect, useState } from 'react';
import { getOverview } from 'src/api/dashboard/dashboard';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}


const UserTopCards = ({cards}:any) => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  console.log("authUser", authUser);
  const [res,setRes]=useState<any>()

  const topcards: cardType[] = [
    {
      icon: icon2,
      title: 'School Admissions',
      digits: authUser?.data?.schoolAdmissions || 0,
      bgcolor: 'primary',
    },
    {
      icon: icon3,
      title: 'Academy Admissions',
      digits: authUser?.data?.academyAdmissions || 0,
      bgcolor: 'warning',
    },
    {
      icon: icon4,
      title: 'Technical Admissions',
      digits: authUser?.data?.technicalAdmissions,
      bgcolor: 'secondary',
    },
    {
      icon: icon5,
      title: 'Team Member',
      digits: cards?.length || 0,
      bgcolor: 'error',
    },
    // {
    //   icon: icon6,
    //   title: 'Payroll',
    //   digits: '$96k',
    //   bgcolor: 'success',
    // },
    // {
    //   icon: icon1,
    //   title: 'Reports',
    //   digits: '59',
    //   bgcolor: 'info',
    // },
  ];
  return (
    (<Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid
          key={i}
          size={{
            xs: 12,
            sm: 3,
            lg: 3
          }}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>)
  );
};

export default UserTopCards;
