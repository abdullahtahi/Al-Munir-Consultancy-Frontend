import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { signOutMe } from '@services/auth';
import { IconMail } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store';
import { signOutUser } from 'src/store/slices/authSlice';
const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const userDetail = useSelector((state: RootState) => state?.auth?.user);
  console.log('userDetail', userDetail);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLogout = useCallback(async () => {
    const response = await signOutMe();
    if (response?.data) {
      dispatch(signOutUser());
      localStorage.clear();
      navigate('/auth/login');
    }
  }, [dispatch]);
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={userDetail?.data?.profile}
          alt={userDetail?.data?.profile}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={userDetail?.data?.profile}
            alt={userDetail?.data?.profile}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              Al-Munir System
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {userDetail?.data?.firstName} {userDetail?.data?.lastName}
              <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight={600}
              >
                level:{userDetail?.data?.level}
              </Typography>
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {userDetail?.data?.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box mt={2}>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};
export default Profile;
