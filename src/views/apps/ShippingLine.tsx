import ShippingLineComponent from '@components/apps/shipping-line';
import PageContainer from '@components/container/PageContainer';
import Box from '@mui/material/Box';

const ShippingLine = () => {
  return (
    <PageContainer title="ShippingLine" description="this is ShippingLine">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ShippingLineComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ShippingLine;
