import PageContainer from '@components/container/PageContainer';
import RolesComponent from '@components/user-management/roles';
import Box from '@mui/material/Box';

const Roles = () => {
  return (
    <PageContainer title="Roles" description="this is Roles">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <RolesComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Roles;
