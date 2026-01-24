import PageContainer from '@components/container/PageContainer';
import { useSelector } from 'react-redux';
import UserDashboard from 'src/components/operations/UserDashboard';
import DashboardComponent from 'src/components/operations/Dashboard';
import { RootState } from 'src/store';

const Dashboard = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  console.log('authUser', authUser);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {authUser?.data?.role == 'super_admin' ? (
        <DashboardComponent />
      ) : (
        <UserDashboard />
      )}
    </PageContainer>
  );
};

export default Dashboard;
