import PageContainer from '@components/container/PageContainer';
import FasahPaymentComponent from '@components/fasah/payment/fasah-payment';
import Box from '@mui/material/Box';

const FasahPayment = () => {
  return (
    <PageContainer title="FasahPayment" description="this is FasahPayment">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <FasahPaymentComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default FasahPayment;
