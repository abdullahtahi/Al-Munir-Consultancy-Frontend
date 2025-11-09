import PageContainer from '@components/container/PageContainer';
import SummaryComponent from '@components/reports/summary';
import Box from '@mui/material/Box';

const Summary = () => {
  return (
    <PageContainer title="Summary" description="this is Summary">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box     sx={{ width: '100%' }}>
          <SummaryComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Summary;
