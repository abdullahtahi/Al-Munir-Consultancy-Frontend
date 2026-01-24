import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from 'src/store';

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
};

interface ItemType {
  item: NavGroup;
  onClick: React.MouseEventHandler<HTMLElement>;
  hideMenu: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const isBorderRadius = useSelector(
    (state: RootState) => state.themeCustomizer.isBorderRadius
  );

  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.1rem" />
    );

  const ListItemStyled2 = styled(ListItemButton)(() => ({
    padding: '5px 10px',
    gap: '10px',
    borderRadius: `${isBorderRadius}px`,
    marginBottom: level > 1 ? '3px' : '0px',
    color:
      level > 1 && pathDirect === item.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-selected': {
      color: level > 1 ? theme.palette.primary.main : 'white!important',
      backgroundColor: level > 1 ? 'transparent' : theme.palette.primary.main,
      '&:hover': {
        backgroundColor: level > 1 ? '' : theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  const listItemProps: {
    component: any;
    href?: string | undefined;
    target?: string | undefined;
    to?: string | undefined;
  } = {
    component: item?.external ? 'a' : NavLink,
    to: item?.external ? undefined : item?.href,
    href: item?.external ? item?.href : undefined,
    target: item?.external ? '_blank' : undefined,
  };

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled2
        {...listItemProps}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>{item.title}</ListItemText>
      </ListItemStyled2>
    </List>
  );
};

export default NavItem;
