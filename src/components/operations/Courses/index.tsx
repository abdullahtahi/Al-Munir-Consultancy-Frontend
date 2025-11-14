import Grid from '@mui/material/Grid2';
import BranchList from './CoursesList';

const CoursesComponent = () => {
  return (
    <Grid container spacing={3}>
      <BranchList/>
      </Grid>
  );
};

export default CoursesComponent;
