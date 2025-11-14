import Grid from '@mui/material/Grid2';
import BranchList from 'src/components/operations/Branches/BranchesList';

const BranchesIn = () => {
  return (
    <Grid container spacing={3}>
      <BranchList/>
    </Grid>
  );
};

export default BranchesIn;
