import PageContainer from '@components/container/PageContainer';
import CroComponent from '@components/reports/cro';
import Box from '@mui/material/Box';

const Cro = () => {
  return (
    <PageContainer title="Cro" description="this is Cro">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <CroComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Cro;
