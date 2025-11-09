import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'src/store';
import Menudata from '../Menudata';
import NavCollapse from '../NavCollapse/NavCollapse';
import NavItem from '../NavItem/NavItem';

const NavListing = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

  const { isCollapse, isSidebarHover } = useSelector((state: RootState) => state.themeCustomizer);

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? isCollapse == "mini-sidebar" && !isSidebarHover : '';

  return (
    <Box>
      <List sx={{ p: 0, display: 'flex', gap: '3px', zIndex: '100' }}>
        {Menudata.map((item) => {
          if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id} onClick={undefined} />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} onClick={function (): void {
                throw new Error('Function not implemented.');
              }} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default NavListing;
