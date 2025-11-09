import IsoCodeComponent from '@components/apps/iso-code';
import PageContainer from '@components/container/PageContainer';
import Box from '@mui/material/Box';

const IsoCode = () => {
  return (
    <PageContainer title="IsoCode" description="this is IsoCode">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <IsoCodeComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default IsoCode;
