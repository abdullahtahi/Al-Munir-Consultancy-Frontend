import PageContainer from '@components/container/PageContainer';
import BulkUploadComponent from '@components/master-data/flm/bulk-upload';
import Box from '@mui/material/Box';

const BulkUpload = () => {
  return (
    <PageContainer title="BulkUpload" description="this is BulkUpload">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BulkUploadComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BulkUpload;
