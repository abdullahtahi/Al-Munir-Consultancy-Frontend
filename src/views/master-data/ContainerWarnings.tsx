import PageContainer from '@components/container/PageContainer';
import ContainerWarningsComponent from '@components/master-data/containers/container-warning';
import Box from '@mui/material/Box';

const ContainerWarnings = () => {
  return (
    <PageContainer
      title="ContainerWarnings"
      description="this is ContainerWarnings"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerWarningsComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ContainerWarnings;
