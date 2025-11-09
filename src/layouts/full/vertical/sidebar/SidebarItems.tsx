import { Box, List, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store'; // adjust path as needed
import { setIsMobileSidebar } from '@store/slices/themeCustomizerSlice';
import Menuitems from './MenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

  const dispatch: AppDispatch = useDispatch();

  const isSidebarHover = useSelector((state: RootState) => state.themeCustomizer.isSidebarHover);
  const isCollapse = useSelector((state: RootState) => state.themeCustomizer.isCollapse);
  const isMobileSidebar = useSelector((state: RootState) => state.themeCustomizer.isMobileSidebar);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp ? isCollapse === "mini-sidebar" && !isSidebarHover : '';

  const handleItemClick = () => {
    dispatch(setIsMobileSidebar(!isMobileSidebar));
  };

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={handleItemClick}
              />
            );
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={handleItemClick}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
