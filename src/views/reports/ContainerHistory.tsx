import PageContainer from '@components/container/PageContainer';
import ContainerHistoryComponent from '@components/reports/container/history';
import Box from '@mui/material/Box';

const ContainerHistory = () => {
  return (
    <PageContainer title="ContainerHistory" description="this is ContainerHistory">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <ContainerHistoryComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ContainerHistory;
