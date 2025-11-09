import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface BreadCrumbType {
  subtitle?: string;
  items?: { title: string; to?: string }[];
  title?: string;
  children?: React.ReactNode;
}

const Breadcrumb = ({ subtitle, items = [], title, children }: BreadCrumbType) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        textAlign: isRTL ? 'right' : 'left',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {title && (
        <Typography variant="h5" fontWeight={600}>
          {t(title)}
        </Typography>
      )}

      {subtitle && (
        <Typography variant="body2" color="textSecondary" mb={1}>
          {t(subtitle)}
        </Typography>
      )}

      {!!items.length && (
        <Breadcrumbs
          separator="/"
          aria-label="breadcrumb"
          sx={{
            fontSize: '0.875rem',
            '& .MuiTypography-root, & a': {
              fontWeight: 500,
              color: theme.palette.text.primary,
            },
          }}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return isLast || !item.to ? (
              <Typography key={item.title} color="text.primary" fontWeight={600}>
                {t(item.title)}
              </Typography>
            ) : (
              <Link
                key={item.title}
                underline="hover"
                color="inherit"
                component={NavLink}
                to={item.to}
              >
                {t(item.title)}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {children && <Box mt={2}>{children}</Box>}
    </Box>
  );
};

export default Breadcrumb;
