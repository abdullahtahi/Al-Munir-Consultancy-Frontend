import PageContainer from '@components/container/PageContainer';
import SocContainerComponent from '@components/master-data/containers/soc-container';
import Box from '@mui/material/Box';

const SocContainer = () => {
  return (
    <PageContainer title="SocContainer" description="this is SocContainer">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <SocContainerComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default SocContainer;
