import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BonusUpdate from 'src/components/dashboards/modern/MonthlyEarnings';
import AdmissionUpdate from 'src/components/dashboards/modern/RevenueUpdates';
import TopCards from 'src/components/dashboards/modern/TopCards';
import TopPerformers from 'src/components/dashboards/modern/TopPerformers';
import PageContainer from 'src/components/layout/PageContainer';
const Dashboard = () => {
  const breadcrumbs = [{ title: 'Home', to: '/' }, { title: 'Dashboard' }];
  return (
    <PageContainer heading={'Dashboard'} breadcrumbs={breadcrumbs}>
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <TopCards />
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <BonusUpdate />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <AdmissionUpdate />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <TopPerformers />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
