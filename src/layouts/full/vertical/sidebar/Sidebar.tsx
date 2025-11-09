import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbar from '@components/custom-scroll/Scrollbar';
import { AppDispatch, RootState } from 'src/store';
import config from '@store/config';
import {
  setIsMobileSidebar,
  setIsSidebarHover,
} from '@store/slices/themeCustomizerSlice';
import useSWR from 'swr';
import Logo from '../../shared/logo/Logo';
import SidebarItems from './SidebarItems';

const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const isCollapse = useSelector((state: RootState) => state.themeCustomizer.isCollapse);
  const isSidebarHover = useSelector((state: RootState) => state.themeCustomizer.isSidebarHover);
  const isMobileSidebar = useSelector((state: RootState) => state.themeCustomizer.isMobileSidebar);

  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;

  const toggleWidth =
    isCollapse === 'mini-sidebar' && !isSidebarHover
      ? MiniSidebarWidth
      : SidebarWidth;

  const onHoverEnter = () => {
    if (isCollapse === 'mini-sidebar') {
      dispatch(setIsSidebarHover(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(setIsSidebarHover(false));
  };

  const { mutate } = useSWR('page-clicks', null, {
    revalidateOnMount: false,
  });

  useEffect(() => {
    const handleClick = () => {
      console.log('Page was clicked!');
      mutate(); // Optional: Track clicks in SWR cache
    };
  //   const timeSpentTimer = setTimeout(() => {
  //   console.log('User has been on the page for 10 seconds!');
  //   mutate()
  // }, 10000);

    // Add click event to entire document
    // document.addEventListener('click', handleClick);
    window.addEventListener('focus',handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('focus', handleClick);
      // document.removeEventListener('click', handleClick);
      // clearTimeout(timeSpentTimer);
    }
  }, [mutate]);

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse === 'mini-sidebar' && {
            position: 'absolute',
          }),
        }}
      >
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                transition: theme.transitions.create('width', {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: 'border-box',
              },
            },
          }}
        >
          <Box sx={{ height: '100%' }}>
            <Box px={3}>
              <Logo />
            </Box>
            <Scrollbar sx={{ height: 'calc(100% - 70px)' }}>
              <SidebarItems />
            </Scrollbar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
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
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
