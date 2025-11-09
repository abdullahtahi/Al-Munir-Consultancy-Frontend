import PageContainer from '@components/container/PageContainer';
import ImageComponent from '@components/master-data/image';
import Box from '@mui/material/Box';

const Image = () => {
  return (
    <PageContainer title="Image" description="this is Image">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ImageComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Image;
