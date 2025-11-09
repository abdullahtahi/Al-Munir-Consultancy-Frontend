import ReportScheduleComponent from '@components/apps/report-schedule';
import PageContainer from '@components/container/PageContainer';
import Box from '@mui/material/Box';

const ReportSchedule = () => {
  return (
    <PageContainer title="ReportSchedule" description="this is ReportSchedule">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ReportScheduleComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ReportSchedule;
