import PageContainer from '@components/container/PageContainer';
import Box from '@mui/material/Box';
import WebsiteSettingComponent from 'src/components/settings/website-setting';

const WebsiteSetting = () => {
  return (
    <PageContainer
      title="Website Setting"
      description="this is Website Setting"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%' }}>
          <WebsiteSettingComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default WebsiteSetting;
