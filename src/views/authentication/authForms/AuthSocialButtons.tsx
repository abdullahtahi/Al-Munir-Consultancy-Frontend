import icon2 from '@assets/images/svgs/facebook-icon.svg';
import icon1 from '@assets/images/svgs/google-icon.svg';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';

import { signInType } from 'src/types/auth/auth';

const AuthSocialButtons = ({ title }: signInType) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton>
        <Avatar
          src={icon1}
          alt={icon1}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            whiteSpace: 'nowrap',
            mr: { sm: '3px' },
          }}
        >
          {title}{' '}
        </Box>{' '}
        Google
      </CustomSocialButton>
      <CustomSocialButton>
        <Avatar
          src={icon2}
          alt={icon2}
          sx={{
            width: 25,
            height: 25,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            whiteSpace: 'nowrap',
            mr: { sm: '3px' },
          }}
        >
          {title}{' '}
        </Box>{' '}
        FB
      </CustomSocialButton>
    </Stack>
  </>
);

export default AuthSocialButtons;
