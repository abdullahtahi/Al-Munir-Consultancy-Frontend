import PageContainer from '@components/container/PageContainer';
import ContainerOnGroundComponent from '@components/reports/container/on-ground';
import Box from '@mui/material/Box';

const ContainerOnGround = () => {
  return (
    <PageContainer
      title="ContainerOnGround"
      description="this is ContainerOnGround"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerOnGroundComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ContainerOnGround;
