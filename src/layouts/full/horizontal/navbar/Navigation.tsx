import { Box, Container, Drawer, Theme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import config from '@store/config';
import { setIsMobileSidebar } from '@store/slices/themeCustomizerSlice';
import Logo from '../../shared/logo/Logo';
import SidebarItems from '../../vertical/sidebar/SidebarItems';
import NavListing from './NavListing/NavListing';

const Navigation = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { isLayout, isMobileSidebar } = useSelector((state: RootState) => state.themeCustomizer);
  const SidebarWidth = config.sidebarWidth;
  const dispatch: AppDispatch = useDispatch();

  if (lgUp) {
    return (
      <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} py={2}>
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <NavListing />
        </Container>
      </Box>
    );
  }

  return (
    (<Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={() => dispatch(setIsMobileSidebar(false))}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            width: SidebarWidth,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
          },
        }
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>)
  );
};

export default Navigation;
