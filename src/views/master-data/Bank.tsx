import PageContainer from '@components/container/PageContainer';
import BankComponent from '@components/master-data/bank';
import Box from '@mui/material/Box';

const Bank = () => {
  return (
    <PageContainer title="Bank" description="this is Bank">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BankComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Bank;
