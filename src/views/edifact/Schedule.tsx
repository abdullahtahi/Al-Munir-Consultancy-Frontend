import PageContainer from '@components/container/PageContainer';
import ScheduleComponent from '@components/edifact/schedule';
import Box from '@mui/material/Box';

const Schedule = () => {
  return (
    <PageContainer title="Schedule" description="this is Schedule">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ScheduleComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Schedule;
