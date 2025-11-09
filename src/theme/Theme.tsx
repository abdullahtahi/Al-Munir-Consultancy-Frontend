import { createTheme } from '@mui/material/styles';
import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as locales from '@mui/material/locale';
import { RootState } from 'src/store';
import components from './Components';
import { DarkThemeColors } from './DarkThemeColors';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import { LightThemeColors } from './LightThemeColors';
import { darkshadows, shadows } from './Shadows';
import typography from './Typography';

// Build theme function
export const BuildTheme = (config: any = {}) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);

  const defaultTheme = config.mode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow = config.mode === 'dark' ? darkshadows : shadows;
  const themeSelect = config.mode === 'dark' ? darkthemeOptions : themeOptions;

  const baseMode = {
    palette: {
      mode: config.mode,
    },
    shape: {
      borderRadius: config.isBorderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  };

  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    })
  );

  theme.components = components(theme);
  return theme;
};

// Hook to get current theme from Redux
const ThemeSettings = () => {
  const { activeTheme, activeDir, activeMode, isBorderRadius } = useSelector(
    (state: RootState) => state.themeCustomizer
  );

  const theme = BuildTheme({
    direction: activeDir,
    theme: activeTheme,
    mode: activeMode,
    isBorderRadius,
  });

  useEffect(() => {
    document.dir = activeDir;
  }, [activeDir]);

  return theme;
};

export { ThemeSettings };

