import PageContainer from '@components/container/PageContainer';
import BulkDownloadComponent from '@components/fasah/bulk/download';
import Box from '@mui/material/Box';

const BulkDownload = () => {
  return (
    <PageContainer title="BulkDownload" description="this is BulkDownload">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BulkDownloadComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BulkDownload;
