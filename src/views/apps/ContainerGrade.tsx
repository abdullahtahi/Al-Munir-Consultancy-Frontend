import ContainerGradeComponent from '@components/apps/container-grade';
import PageContainer from '@components/container/PageContainer';
import Box from '@mui/material/Box';

const ContainerGrade = () => {
  return (
    <PageContainer title="ContainerGrade" description="this is ContainerGrade">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerGradeComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ContainerGrade;
