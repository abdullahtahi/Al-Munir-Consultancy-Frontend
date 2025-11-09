import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import config from '@store/config';
import { setActiveMode, setIsCollapse, setIsMobileSidebar } from '@store/slices/themeCustomizerSlice';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import Depots from './Depots';
import Language from './Language';
import MobileRightSidebar from './MobileRightSidebar';
import Navigation from './Navigation';
import Profile from './Profile';
import Search from './Search';

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const dispatch: AppDispatch = useDispatch();

  const TopbarHeight = config.topbarHeight;

  // drawer
  const activeMode = useSelector((state: RootState) => state.themeCustomizer.activeMode)
  const isCollapse = useSelector((state: RootState) => state.themeCustomizer.isCollapse)
  const isMobileSidebar = useSelector((state: RootState) => state.themeCustomizer.isMobileSidebar)

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => {
            // Toggle sidebar on both mobile and desktop based on screen size
            if (lgUp) {
              // For large screens, toggle between full-sidebar and mini-sidebar
              isCollapse === "full-sidebar" ? dispatch(setIsCollapse("mini-sidebar")) : dispatch(setIsCollapse("full-sidebar"));
            } else {
              // For smaller screens, toggle mobile sidebar
              dispatch(setIsMobileSidebar(!isMobileSidebar));
            }
          }}
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
       

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">

          {lgUp ? (
            <>
            </>
          ) : null}
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <IconButton
            size="large"
            color="inherit"
            onClick={() =>
              dispatch(setActiveMode(activeMode === "light" ? "dark" : "light"))
            }
          >
            {activeMode === "light" ? (
              <IconMoon size="21" stroke="1.5" />
            ) : (
              <IconSun size="21" stroke="1.5" />
            )}
          </IconButton>

          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {lgDown ? <MobileRightSidebar /> : null}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
