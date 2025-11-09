import PageContainer from '@components/container/PageContainer';
import TruckTrafficComponent from '@components/reports/depot/truck-traffic';
import Box from '@mui/material/Box';

const TruckTraffic = () => {
  return (
    <PageContainer title="TruckTraffic" description="this is TruckTraffic">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <TruckTrafficComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default TruckTraffic;
