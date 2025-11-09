import PageContainer from '@components/container/PageContainer';
import StockReportComponent from '@components/reports/stock';
import Box from '@mui/material/Box';

const StockReport = () => {
  return (
    <PageContainer title="StockReport" description="this is StockReport">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <StockReportComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default StockReport;
