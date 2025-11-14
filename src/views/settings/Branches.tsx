import PageContainer from '@components/container/PageContainer';
import BranchesIn from 'src/components/settings/Branches';
import Box from '@mui/material/Box';

const Branches = () => {
  return (
    <PageContainer title="Branches" description="this is Branches">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BranchesIn />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Branches;
