import PageContainer from '@components/container/PageContainer';
import StockReport1Component from '@components/reports/stock';
import Box from '@mui/material/Box';

const StockReport1 = () => {
  return (
    <PageContainer title="StockReport1" description="this is StockReport1">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <StockReport1Component />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default StockReport1;
