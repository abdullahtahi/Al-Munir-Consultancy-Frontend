import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserTeamStructure } from 'src/api/dashboard/dashboard';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import TeamStructure from 'src/components/dashboards/modern/TeamStructure';
import UserTopCards from 'src/components/dashboards/modern/UserTopCards';
import PageContainer from 'src/components/layout/PageContainer';
import { RootState } from 'src/store';
const UserDashboard = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  console.log('authUser', authUser);
  const [res, setRes] = useState<any>();
  const breadcrumbs = [{ title: 'Home', to: '/' }, { title: 'UserDashboard' }];

  const cardTeamStructure = async () => {
    try {
      const response: any = await UserTeamStructure();

      setRes(response.data);
      console.log('response', response.data?.teamStructure?.children);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cardTeamStructure();
  }, []);
  return (
    <PageContainer heading={'User Dashboard'} breadcrumbs={breadcrumbs}>
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <WelcomeCard
              authUser={authUser}
              statsInfo={res?.bonusInfo?.summary}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <UserTopCards cards={res?.teamStructure?.children} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          ></Grid>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <TeamStructure teamMember={res?.teamStructure?.children} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default UserDashboard;
