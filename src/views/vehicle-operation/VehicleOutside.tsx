
import PageContainer from '@components/container/PageContainer';
import VehicleOutsideComponent from '@components/vehicle-operation/vehicle-outside';
import Box from '@mui/material/Box';

const VehicleOutside = () => {
  return (
    <PageContainer title="VehicleOutside" description="this is VehicleOutside">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <VehicleOutsideComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default VehicleOutside;
