import PageContainer from '@components/container/PageContainer';
import ContainerComponent from '@components/master-data/containers/container';
import Box from '@mui/material/Box';

const Container = () => {
  return (
    <PageContainer title="Container" description="this is Container">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Container;
