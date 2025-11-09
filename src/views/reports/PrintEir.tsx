import PageContainer from '@components/container/PageContainer';
import PrintEirComponent from '@components/reports/print-eir';
import Box from '@mui/material/Box';

const PrintEir = () => {
  return (
    <PageContainer title="PrintEir" description="this is PrintEir">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <PrintEirComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default PrintEir;
