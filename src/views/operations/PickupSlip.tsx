import PageContainer from '@components/container/PageContainer';
import PickupSlipComponent from '@components/operations/pickupslip';
import Box from '@mui/material/Box';

const PickupSlip = () => {
  return (
    <PageContainer title="PickupSlip" description="this is PickupSlip">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <PickupSlipComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default PickupSlip;
