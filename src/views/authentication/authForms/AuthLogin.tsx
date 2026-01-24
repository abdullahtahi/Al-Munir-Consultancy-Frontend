import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomFormLabel from '@components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@components/forms/theme-elements/CustomTextField';
import { signIn } from '@services/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { loadUser } from 'src/store/slices/authSlice';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}
interface AuthLoginProps {
  title?: string;
  subtitle?: ReactNode;
  subtext?: ReactNode;
}

const AuthLogin = ({ title, subtitle, subtext }: AuthLoginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validation function
  const validate = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Load reCAPTCHA script
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setIsSubmitting(true);

      const response: any = await signIn(formData.email, formData.password);

      if (response.data && response?.data?.user?.status == 'active') {
        await dispatch(loadUser()).unwrap();
        setSnackbar({
          open: true,
          message: response.message || 'Login SuccessFully',
          severity: 'success',
        });
        navigate('/');
        return;
      } else if (response?.data && response?.data?.user?.status !== 'active') {
        setSnackbar({
          open: true,
          message: 'User account is not Active. Contact Admin!',
          severity: 'error',
        });
        return;
      } else {
        setSnackbar({
          open: true,
          message: response?.error?.message || 'Incorrect Crentential',
          severity: 'error',
        });
        return;
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Incorrect Crentential',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              sx={{ width: '400px' }}
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              autoComplete="username"
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              sx={{ width: '400px' }}
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              autoComplete="current-password"
            />
          </Box>
          <Stack
            justifyContent="end"
            direction="row"
            alignItems="center"
            my={2}
            sx={{
              width: '400px !important',
            }}
          >
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            sx={{ width: '400px' }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </form>
      {subtitle}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthLogin;
