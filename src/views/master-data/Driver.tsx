import PageContainer from '@components/container/PageContainer';
import DriverComponent from '@components/master-data/flm/driver';
import Box from '@mui/material/Box';

const ChangeGrade = () => {
  return (
    <PageContainer title="ChangeGrade" description="this is ChangeGrade">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <DriverComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ChangeGrade;
