import PageContainer from '@components/container/PageContainer';
import RepairServicesComponent from '@components/work-shop/repair-services';
import Box from '@mui/material/Box';

const RepairServices = () => {
  return (
    <PageContainer title="RepairServices" description="this is RepairServices">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <RepairServicesComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default RepairServices;
