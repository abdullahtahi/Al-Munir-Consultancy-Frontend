import PageContainer from '@components/container/PageContainer';
import ContainerReportComponent from '@components/edifact/reports/container-report';
import Box from '@mui/material/Box';

const ContainerReport = () => {
  return (
    <PageContainer title="ContainerReport" description="this is ContainerReport">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerReportComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ContainerReport;
