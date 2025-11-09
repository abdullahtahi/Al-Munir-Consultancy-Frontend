import PageContainer from '@components/container/PageContainer';
import InComponent from '@components/fasah/in';
import Box from '@mui/material/Box';

const In = () => {
  return (
    <PageContainer title="In" description="this is In">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <InComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default In;
