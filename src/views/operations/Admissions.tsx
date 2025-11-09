import PageContainer from '@components/container/PageContainer';
import AdmissionComponent from 'src/components/operations/Admissions';
import Box from '@mui/material/Box';

const Admission = () => {
  return (
    <PageContainer title="Admissions" description="this is Admissions">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <AdmissionComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Admission;
