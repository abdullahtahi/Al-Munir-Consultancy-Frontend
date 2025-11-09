'use client';
import { Box, Container, styled, useTheme } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from 'src/store';
import config from '@store/config';
import ScrollToTop from '../../components/shared/ScrollToTop';
import LoadingBar from '../../LoadingBar';
import HorizontalHeader from '../full/horizontal/header/Header';
import Navigation from '../full/horizontal/navbar/Navigation';
import Customizer from './shared/customizer/Customizer';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {
  const theme = useTheme();
  const MiniSidebarWidth = config.miniSidebarWidth;

  // Redux selectors
  const activeLayout = useSelector((state: RootState) => state.themeCustomizer.activeLayout);
  const isLayout = useSelector((state: RootState) => state.themeCustomizer.isLayout);
  const activeMode = useSelector((state: RootState) => state.themeCustomizer.activeMode);
  const isCollapse = useSelector((state: RootState) => state.themeCustomizer.isCollapse);

  return (
    <>
      <LoadingBar />
      <MainWrapper className={activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
        {/* Sidebar */}
        {activeLayout === 'horizontal' ? '' : <Sidebar />}

        {/* Main Content */}
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse === 'mini-sidebar' && {
              [theme.breakpoints.up('lg')]: { ml: `${MiniSidebarWidth}px` },
            }),
          }}
        >
          {/* Header */}
          {activeLayout === 'horizontal' ? <HorizontalHeader /> : <Header />}
          {activeLayout === 'horizontal' ? <Navigation /> : ''}

          <Container
            sx={{
              pt: '30px',
              maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
          >
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <ScrollToTop>
                <Outlet />
              </ScrollToTop>
            </Box>
          </Container>

          <Customizer />
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
