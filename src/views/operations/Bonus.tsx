import PageContainer from '@components/container/PageContainer';
import BonusComponent from 'src/components/operations/Bonus';
import Box from '@mui/material/Box';

const Bonus = () => {
  return (
    <PageContainer title="Bonus" description="this is Bonus">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <BonusComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Bonus;
