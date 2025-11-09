import PageContainer from '@components/container/PageContainer';
import BulkGenerateComponent from '@components/edifact/bulk-generate';
import Box from '@mui/material/Box';

const BulkGenerate = () => {
  return (
    <PageContainer title="BulkGenerate" description="this is BulkGenerate">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BulkGenerateComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BulkGenerate;
