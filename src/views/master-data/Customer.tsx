import PageContainer from '@components/container/PageContainer';
import CustomerComponent from '@components/master-data/customer';
import Box from '@mui/material/Box';

const Customer = () => {
  return (
    <PageContainer title="Customer" description="this is Customer">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <CustomerComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Customer;
