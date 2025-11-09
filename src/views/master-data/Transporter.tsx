import PageContainer from '@components/container/PageContainer';
import TransporterComponent from '@components/master-data/flm/transporter';
import Box from '@mui/material/Box';

const Transporter = () => {
  return (
    <PageContainer title="Transporter" description="this is Transporter">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <TransporterComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Transporter;
