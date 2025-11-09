import PageContainer from '@components/container/PageContainer';
import SaleUnitComponent from '@components/operations/sale-unit';
import Box from '@mui/material/Box';

const SaleUnit = () => {
  return (
    <PageContainer title="SaleUnit" description="this is SaleUnit">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <SaleUnitComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default SaleUnit;
