import PageContainer from '@components/container/PageContainer';
import CustomerFasahComponent from '@components/reports/fasah/customer';
import Box from '@mui/material/Box';

const CustomerFasah = () => {
  return (
    <PageContainer title="CustomerFasah" description="this is CustomerFasah">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <CustomerFasahComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default CustomerFasah;
