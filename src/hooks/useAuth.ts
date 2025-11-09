import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/index';
import { clearError, loadUser, signInUser, signOutUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  // Automatically check auth state when hook is used
  useEffect(() => {
    if (!authState.isAuthenticated && !authState.loading) {
      dispatch(loadUser());
    }
  }, [dispatch, authState.isAuthenticated, authState.loading]);

  const signIn = async (username: string, password: string, recaptchaToken: string) => {
    try {
      const result = await dispatch(signInUser({ username, password, recaptchaToken })).unwrap();
      if (result?.token) {
        navigate('/'); // Redirect on successful login
      }
      return result;
    } catch (error) {
      throw error; // Re-throw for error handling in components
    }
  };

  const signOut = () => {
    dispatch(signOutUser());
    navigate('/login'); // Redirect to login after sign out
  };

  return {
    ...authState,
    signIn,
    signOut,
    loadUser: () => dispatch(loadUser()),
    clearError: () => dispatch(clearError()),
  };
};