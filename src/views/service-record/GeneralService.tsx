import PageContainer from '@components/container/PageContainer';
import GeneralServiceComponent from '@components/service-record/general-service';
import Box from '@mui/material/Box';

const GeneralService = () => {
  return (
    <PageContainer title="GeneralService" description="this is GeneralService">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <GeneralServiceComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default GeneralService;
