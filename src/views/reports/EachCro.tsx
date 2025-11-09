import PageContainer from '@components/container/PageContainer';
import EachCroComponent from '@components/reports/cro';
import Box from '@mui/material/Box';

const EachCro = () => {
  return (
    <PageContainer title="EachCro" description="this is EachCro">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <EachCroComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EachCro;
