import PageContainer from '@components/container/PageContainer';
import DashboardComponent from 'src/components/operations/Dashboard';
import Box from '@mui/material/Box';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <DashboardComponent/>
    </PageContainer>
  );
};

export default Dashboard;
