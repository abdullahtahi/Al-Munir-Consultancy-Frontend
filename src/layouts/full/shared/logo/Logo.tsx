import { ReactComponent as LogoDark } from '@assets/images/logos/dark-logo.svg';
import { ReactComponent as LogoDarkRTL } from '@assets/images/logos/dark-rtl-logo.svg';
import { ReactComponent as LogoLightRTL } from '@assets/images/logos/light-logo-rtl.svg';
import { ReactComponent as LogoLight } from '@assets/images/logos/light-logo.svg';
import { ReactComponent as LogoMini } from '@assets/images/logos/logoIcon.svg';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material';
import config from '@store/config';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { BASE_URL } from 'src/constants/AppConstants';

const Logo: FC = () => {
  const { isCollapse, isSidebarHover, activeDir, activeMode } = useSelector(
    (state: RootState) => state.themeCustomizer
  );

  const TopbarHeight = config.topbarHeight;

  const LinkStyled = styled(Link)(() => ({
    height: TopbarHeight,
    width: isCollapse === 'mini-sidebar' && !isSidebarHover ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  const renderLogo = () => {
    if (isCollapse === 'mini-sidebar' && !isSidebarHover) {
      return     <img
      src={`${BASE_URL + '/' + 'photos/2q6y1ilvmhds047f-1761850004810.jpg'}`}
      alt="bg"
      style={{
        width: '38%',
        maxWidth: '400px',
        height: 'auto',
        objectFit: 'contain',
      }}
    />;
    }

    if (activeDir === 'ltr') {
      return activeMode === 'dark' ?    <img
      src={`${BASE_URL + '/' + 'photos/2q6y1ilvmhds047f-1761850004810.jpg'}`}
      alt="bg"
      style={{
        width: '38%',
        maxWidth: '400px',
        height: 'auto',
        objectFit: 'contain',
      }}
    /> :   <img
      src={`${BASE_URL + '/' + 'photos/2q6y1ilvmhds047f-1761850004810.jpg'}`}
      alt="bg"
      style={{
        width: '38%',
        maxWidth: '400px',
        height: 'auto',
        objectFit: 'contain',
      }}
    />;
    } else {
      return activeMode === 'dark' ? <LogoDarkRTL /> : <LogoLightRTL />;
    }
  };

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:"center"
      }}
    >
      {renderLogo()}
    </LinkStyled>
  );
};

export default Logo;
