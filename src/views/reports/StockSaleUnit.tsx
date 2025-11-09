import PageContainer from '@components/container/PageContainer';
import StockSaleUnitComponent from '@components/reports/stock';
import Box from '@mui/material/Box';

const StockSaleUnit = () => {
  return (
    <PageContainer title="StockSaleUnit" description="this is StockSaleUnit">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <StockSaleUnitComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default StockSaleUnit;
