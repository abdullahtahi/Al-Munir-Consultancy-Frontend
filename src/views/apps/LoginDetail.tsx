import PageContainer from '@components/container/PageContainer';
import LoginDetailComponent from '@components/user-management/login-detail';
import Box from '@mui/material/Box';

const LoginDetail = () => {
  return (
    <PageContainer title="LoginDetail" description="this is LoginDetail">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <LoginDetailComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default LoginDetail;
