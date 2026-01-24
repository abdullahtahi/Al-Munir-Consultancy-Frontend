import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Logo from '@layouts/full/shared/logo/Logo';
import Language from '@layouts/full/vertical/header/Language';
import Navigation from '@layouts/full/vertical/header/Navigation';
import Profile from '@layouts/full/vertical/header/Profile';
import Search from '@layouts/full/vertical/header/Search';
import config from '@store/config';
import {
  setActiveMode,
  setIsMobileSidebar,
} from '@store/slices/themeCustomizerSlice';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';

const Header = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const dispatch: AppDispatch = useDispatch();
  const terminals = useSelector((state: RootState) => state.auth.terminals);

  // drawer
  const { isLayout, isMobileSidebar, activeMode } = useSelector(
    (state: RootState) => state.themeCustomizer
  );
  const TopbarHeight = config.topbarHeight;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    margin: '0 auto',
    width: '100%',
    color: `${theme.palette.text.secondary} !important`,
  }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8}>
      <ToolbarStyled
        sx={{
          maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
        }}
      >
        <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(setIsMobileSidebar(!isMobileSidebar))}
          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ''
        )}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}

          <IconButton size="large" color="inherit">
            {activeMode === 'light' ? (
              <IconMoon
                size="21"
                stroke="1.5"
                onClick={() => dispatch(setActiveMode('dark'))}
              />
            ) : (
              <IconSun
                size="21"
                stroke="1.5"
                onClick={() => dispatch(setActiveMode('light'))}
              />
            )}
          </IconButton>
          {/* <Notifications /> */}

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
