import PageContainer from '@components/container/PageContainer';
import BulkAppointmentComponent from '@components/fasah/bulk/appointment';
import Box from '@mui/material/Box';

const BulkAppointment = () => {
  return (
    <PageContainer
      title="BulkAppointment"
      description="this is BulkAppointment"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BulkAppointmentComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BulkAppointment;
