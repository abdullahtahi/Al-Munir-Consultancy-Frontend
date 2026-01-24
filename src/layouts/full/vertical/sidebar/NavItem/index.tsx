import React from 'react';
import { NavLink } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  hideMenu?: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, hideMenu, onClick }: ItemType) => {
  const isBorderRadius = useSelector(
    (state: RootState) => state.themeCustomizer.isBorderRadius
  );

  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    );

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: `${isBorderRadius}px`,
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
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
    <List component="li" disablePadding key={item?.id && item.title}>
      <ListItemStyled
        {...listItemProps}
        disabled={item?.disabled}
        selected={pathDirect === item?.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color:
              level > 1 && pathDirect === item?.href
                ? `${theme.palette.primary.main}!important`
                : 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          {hideMenu ? '' : <>{t(`${item?.title}`)}</>}
          <br />
          {item?.subtitle ? (
            <Typography variant="caption">
              {hideMenu ? '' : item?.subtitle}
            </Typography>
          ) : (
            ''
          )}
        </ListItemText>

        {!item?.chip || hideMenu ? null : (
          <Chip
            color={item?.chipColor}
            variant={item?.variant ? item?.variant : 'filled'}
            size="small"
            label={item?.chip}
          />
        )}
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
