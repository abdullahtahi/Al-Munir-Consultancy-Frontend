import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';

interface PageHeaderProps {
  heading?: ReactNode;
  breadcrumbComponent?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  heading,
  breadcrumbComponent,
  action,
  children,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection='row'
      alignItems={isXs ? 'center' : 'flex-start'}
      mb={{ xs: 4 }}
      className="page-header"
    >
      {heading && (
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 0, fontWeight: 600 }}
          className="title"
        >
          {heading}
        </Typography>
      )}
      {action && (
        <Box ml={isXs ? 1 : 2} mr={isXs ? 1 : 0} mt={0}>
          {action}
        </Box>
      )}
      {breadcrumbComponent && (
        <Box ml="auto" mt={0}>
          {breadcrumbComponent}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default PageHeader;
