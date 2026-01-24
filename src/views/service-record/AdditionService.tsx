import PageContainer from '@components/container/PageContainer';
import AdditionServiceComponent from '@components/service-record/addition-service';
import Box from '@mui/material/Box';

const AdditionService = () => {
  return (
    <PageContainer
      title="AdditionService"
      description="this is AdditionService"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <AdditionServiceComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AdditionService;
