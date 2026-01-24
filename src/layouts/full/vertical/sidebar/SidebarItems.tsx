import { Box, List, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store'; // adjust path as needed
import { setIsMobileSidebar } from '@store/slices/themeCustomizerSlice';
import Menuitems from './MenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';
import AuthorizeComponent from 'src/utils/AuthorizeComponent';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

  const dispatch: AppDispatch = useDispatch();

  const isSidebarHover = useSelector(
    (state: RootState) => state.themeCustomizer.isSidebarHover
  );
  const isCollapse = useSelector(
    (state: RootState) => state.themeCustomizer.isCollapse
  );
  const isMobileSidebar = useSelector(
    (state: RootState) => state.themeCustomizer.isMobileSidebar
  );

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp
    ? isCollapse === 'mini-sidebar' && !isSidebarHover
    : '';

  const handleItemClick = () => {
    dispatch(setIsMobileSidebar(!isMobileSidebar));
  };

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            if (item.permission) {
              return (
                <AuthorizeComponent
                  permission={item.permission}
                  key={item.subheader}
                >
                  <NavGroup item={item} hideMenu={hideMenu} />
                </AuthorizeComponent>
              );
            }
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );
          } else if (item.children) {
            if (item.permission) {
              return (
                <AuthorizeComponent permission={item.permission} key={item.id}>
                  <NavCollapse
                    menu={item}
                    pathDirect={pathDirect}
                    hideMenu={hideMenu}
                    pathWithoutLastPart={pathWithoutLastPart}
                    level={1}
                    onClick={handleItemClick}
                  />
                </AuthorizeComponent>
              );
            }
            return (
              <NavCollapse
                key={item.id}
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                onClick={handleItemClick}
              />
            );
          } else {
            if (item.permission) {
              return (
                <AuthorizeComponent permission={item.permission} key={item.id}>
                  <NavItem
                    item={item}
                    pathDirect={pathDirect}
                    hideMenu={hideMenu}
                    onClick={handleItemClick}
                  />
                </AuthorizeComponent>
              );
            }
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
