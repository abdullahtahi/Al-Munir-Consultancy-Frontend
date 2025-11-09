import PageContainer from '@components/container/PageContainer';
import OutComponent from '@components/fasah/out';
import Box from '@mui/material/Box';

const Out = () => {
  return (
    <PageContainer title="Out" description="this is Out">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <OutComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Out;
