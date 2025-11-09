import PageContainer from '@components/container/PageContainer';
import GateInOperationComponent from '@components/reports/gate-operation/in';
import Box from '@mui/material/Box';

const GateInOperation = () => {
  return (
    <PageContainer title="GateInOperation" description="this is GateInOperation">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <GateInOperationComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default GateInOperation;
