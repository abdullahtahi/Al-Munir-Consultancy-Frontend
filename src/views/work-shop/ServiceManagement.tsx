import PageContainer from '@components/container/PageContainer';
import ServiceManagementComponent from '@components/work-shop/service-management';
import Box from '@mui/material/Box';

const ServiceManagement = () => {
  return (
    <PageContainer
      title="ServiceManagement"
      description="this is ServiceManagement"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ServiceManagementComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ServiceManagement;
