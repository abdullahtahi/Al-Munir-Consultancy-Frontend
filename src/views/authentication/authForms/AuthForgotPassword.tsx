import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { forgotPassword } from '@services/auth';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await forgotPassword(username);
    if (response.error) {
      alert("user is not registered")
      return;
    }
    alert("success")
    navigate('/auth/login');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
          <CustomTextField
            id="reset-email"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />

          <Button color="primary" variant="contained" size="large" type='submit' fullWidth>
            Forgot Password
          </Button>
          <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
            Back to Login
          </Button>
        </Stack>
      </form>
    </>
  )
};

export default AuthForgotPassword;