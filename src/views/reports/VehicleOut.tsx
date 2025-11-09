import PageContainer from '@components/container/PageContainer';
import VehicleOutComponent from '@components/reports/vehicle/vehicle-out';
import Box from '@mui/material/Box';

const VehicleOut = () => {
  return (
    <PageContainer title="VehicleOut" description="this is VehicleOut">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <VehicleOutComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default VehicleOut;
