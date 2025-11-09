import PageContainer from '@components/container/PageContainer';
import ScrapComponent from '@components/master-data/containers/scrap';
import Box from '@mui/material/Box';

const Scrap = () => {
  return (
    <PageContainer title="Scrap" description="this is Scrap">
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ScrapComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Scrap;
