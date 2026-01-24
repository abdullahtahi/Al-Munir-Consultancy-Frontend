import PageContainer from '@components/container/PageContainer';
import StorageServicesComponent from '@components/service-record/storage-services';
import Box from '@mui/material/Box';

const StorageServices = () => {
  return (
    <PageContainer
      title="StorageServices"
      description="this is StorageServices"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <StorageServicesComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default StorageServices;
