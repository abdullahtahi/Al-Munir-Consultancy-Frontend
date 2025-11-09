import PageContainer from '@components/container/PageContainer';
import VehicleInComponent from '@components/vehicle-operation/vehicle-in';
import Box from '@mui/material/Box';

const VehicleIn = () => {
  return (
    <PageContainer title="VehicleIn" description="this is VehicleIn">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <VehicleInComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default VehicleIn;
