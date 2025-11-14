import PageContainer from '@components/container/PageContainer';
import CoursesIn from 'src/components/settings/Courses';
import Box from '@mui/material/Box';

const Courses = () => {
  return (
    <PageContainer title="Courses" description="this is Courses">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <CoursesIn />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Courses;
