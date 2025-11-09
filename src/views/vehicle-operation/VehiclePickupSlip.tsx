import PageContainer from '@components/container/PageContainer';
import VehiclePickupSlipComponent from '@components/vehicle-operation/vehicle-pickupslip';
import Box from '@mui/material/Box';

const VehiclePickupSlip = () => {
  return (
    <PageContainer title="VehiclePickupSlip" description="this is VehiclePickupSlip">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <VehiclePickupSlipComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default VehiclePickupSlip;
