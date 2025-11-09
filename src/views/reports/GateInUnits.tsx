import PageContainer from '@components/container/PageContainer';
import GateInUnitsComponent from '@components/reports/depot/gate-in';
import Box from '@mui/material/Box';

const GateInUnits = () => {
  return (
    <PageContainer title="GateInUnits" description="this is GateInUnits">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <GateInUnitsComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default GateInUnits;
