import PageContainer from '@components/container/PageContainer';
import UserComponent from '@components/user-management/user';
import Box from '@mui/material/Box';

const User = () => {
  return (
    <PageContainer title="User" description="this is User">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <UserComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default User;
