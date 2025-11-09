import PageContainer from '@components/container/PageContainer';
import TruckComponent from '@components/master-data/flm/truck';
import Box from '@mui/material/Box';

const Truck = () => {
  return (
    <PageContainer title="Truck" description="this is Truck">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <TruckComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Truck;
