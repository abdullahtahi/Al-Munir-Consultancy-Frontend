import PageContainer from '@components/container/PageContainer';
import EdiReportComponent from '@components/edifact/reports/edi-report';
import Box from '@mui/material/Box';

const EdiReport = () => {
  return (
    <PageContainer title="EdiReport" description="this is EdiReport">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <EdiReportComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EdiReport;
