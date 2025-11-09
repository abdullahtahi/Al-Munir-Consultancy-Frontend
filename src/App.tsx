import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useApplyCustomizer } from './hooks/useApplyCustomizer';
import RTL from './layouts/full/shared/customizer/RTL';
import router from './routes/Router';
import { AppDispatch, RootState } from './store';
import { loadUser } from './store/slices/authSlice';
import { ThemeSettings } from './theme/Theme';
import './index.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const activeDir = useSelector(
    (state: RootState) => state.themeCustomizer.activeDir
  );
  const theme = ThemeSettings();

  useApplyCustomizer();

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await dispatch(loadUser()).unwrap();
        } catch (error) {
          console.error('Initialization error:', error);
          localStorage.removeItem('token');
        }
      }
    };

    initializeApp();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RTL direction={activeDir}>
          <CssBaseline />
          <RouterProvider router={router} />
        </RTL>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
