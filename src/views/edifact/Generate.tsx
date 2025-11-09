import PageContainer from '@components/container/PageContainer';
import GenerateComponent from '@components/edifact/generate';
import Box from '@mui/material/Box';

const Generate = () => {
  return (
    <PageContainer title="Generate" description="this is Generate">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <GenerateComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Generate;
