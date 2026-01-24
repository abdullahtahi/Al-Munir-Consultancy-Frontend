import { Box, Paper, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

interface PageSectionProps {
  children: ReactNode;
  sx?: object;
  elevation?: number;
}

const PageSection = ({
  children,
  sx = {},
  elevation = 1,
}: PageSectionProps) => {
  const theme = useTheme();
  const isBorderRadius = useSelector(
    (state: RootState) => state.themeCustomizer.isBorderRadius
  );

  return (
    <Box width="100%">
      <Paper
        elevation={elevation}
        sx={{
          backgroundColor: theme.palette.background.paper,
          p: { xs: 2, sm: 3 },
          borderRadius: isBorderRadius,
          ...sx,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default PageSection;
