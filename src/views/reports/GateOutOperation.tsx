import PageContainer from '@components/container/PageContainer';
import GateOutOperationComponent from '@components/reports/gate-operation/out';
import Box from '@mui/material/Box';

const GateOutOperation = () => {
  return (
    <PageContainer title="GateOutOperation" description="this is GateOutOperation">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <GateOutOperationComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default GateOutOperation;
