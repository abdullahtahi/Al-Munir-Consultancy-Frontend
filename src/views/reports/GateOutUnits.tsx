import PageContainer from '@components/container/PageContainer';
import GateOutUnitsComponent from '@components/reports/depot/gate-out';
import Box from '@mui/material/Box';

const GateOutUnits = () => {
  return (
    <PageContainer title="GateOutUnits" description="this is GateOutUnits">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <GateOutUnitsComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default GateOutUnits;
