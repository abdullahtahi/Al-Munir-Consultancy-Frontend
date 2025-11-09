import PageContainer from '@components/container/PageContainer';
import EirInComponent from 'src/components/operations/Users';
import Box from '@mui/material/Box';

const EirIn = () => {
  return (
    <PageContainer title="Consultant" description="this is Consultant">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <EirInComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EirIn;
