import PageContainer from '@components/container/PageContainer';
import Box from '@mui/material/Box';

const VehiclePickupSlip = () => {
  return (
    <PageContainer
      title="VehiclePickupSlip"
      description="this is VehiclePickupSlip"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}></Box>
      </Box>
    </PageContainer>
  );
};

export default VehiclePickupSlip;
