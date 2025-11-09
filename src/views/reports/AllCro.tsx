import PageContainer from '@components/container/PageContainer';
import AllCroComponent from '@components/reports/cro';
import Box from '@mui/material/Box';

const AllCro = () => {
  return (
    <PageContainer title="AllCro" description="this is AllCro">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <AllCroComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AllCro;
