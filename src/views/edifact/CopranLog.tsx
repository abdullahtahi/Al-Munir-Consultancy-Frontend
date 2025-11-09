import PageContainer from '@components/container/PageContainer';
import CopranLogComponent from '@components/edifact/reports/copran-log';
import Box from '@mui/material/Box';

const CopranLog = () => {
  return (
    <PageContainer title="CopranLog" description="this is CopranLog">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <CopranLogComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default CopranLog;
