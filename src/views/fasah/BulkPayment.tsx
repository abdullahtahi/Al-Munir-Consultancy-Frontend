import PageContainer from '@components/container/PageContainer';
import BulkPaymentComponent from '@components/fasah/payment/bulk-payment';
import Box from '@mui/material/Box';

const BulkPayment = () => {
  return (
    <PageContainer title="BulkPayment" description="this is BulkPayment">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BulkPaymentComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BulkPayment;
