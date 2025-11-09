import PageContainer from '@components/container/PageContainer';
import ContainerFasahComponent from '@components/reports/fasah/container';
import Box from '@mui/material/Box';

const ContainerFasah = () => {
  return (
    <PageContainer title="ContainerFasah" description="this is ContainerFasah">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerFasahComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ContainerFasah;
