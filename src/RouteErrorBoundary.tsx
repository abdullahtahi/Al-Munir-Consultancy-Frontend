// src/RouteErrorBoundary.tsx
import { Box, Button, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();

  let title = 'Unexpected Application Error!';
  let message = 'Something went wrong.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`;
    message = (error.data as { message?: string })?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={3}
    >
      <Typography variant="h5" color="error" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleReset}
      >
        Reload Page
      </Button>
    </Box>
  );
}
