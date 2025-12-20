import PageContainer from '@components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import AuthLogin from '../authForms/AuthLogin';
import { BASE_URL } from 'src/constants/AppConstants';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';

const Login = () => {
  const {activeMode } = useSelector(
    (state: RootState) => state.themeCustomizer
  );
  
  
  return(
  <PageContainer title="Login" description="this is Login page">
   <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    width: '100vw',
    height: '100vh',
    overflow:"auto",
  }}
>
  {/* Left Side (Image Section) */}
  <Box
    sx={{
      position: 'relative',
      flex: { xs: '1 1 100%', lg: '1 1 50%' },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: activeMode =='dark'?"#28292a":'#f2f2f280',
      boxShadow: `0 4px 10px 66`,
    }}
  >
    <img
      src={`${BASE_URL + '/' + 'photos/2q6y1ilvmhds047f-1761850004810.jpg'}`}
      alt="bg"
      style={{
        width: '80%',
        maxWidth: '400px',
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  </Box>

  {/* Right Side (Login Form Section) */}
  <Box
    sx={{
      flex: { xs: '1 1 100%', lg: '1 1 50%' },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box p={4} width="100%" maxWidth="400px">
      <AuthLogin
        title="Welcome to Al-Munir Consultancy"
        subtext={
          <Typography variant="subtitle1" color="textSecondary" mb={1}></Typography>
        }
      />
    </Box>
  </Box>
</Box>

  </PageContainer>
)};

export default Login;
