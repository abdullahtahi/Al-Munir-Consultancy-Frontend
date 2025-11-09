import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useApplyCustomizer = () => {
  const {
    activeMode,
    activeDir,
    activeTheme,
    activeLayout,
    isLayout,
    isCollapse,
  } = useSelector((state: RootState) => state.themeCustomizer);

  useEffect(() => {
    document.documentElement.setAttribute('class', activeMode);
    document.documentElement.setAttribute('dir', activeDir);
    document.documentElement.setAttribute('data-color-theme', activeTheme);
    document.documentElement.setAttribute('data-layout', activeLayout);
    document.documentElement.setAttribute('data-boxed-layout', isLayout);
    document.documentElement.setAttribute('data-sidebar-type', isCollapse);
  }, [activeMode, activeDir, activeTheme, activeLayout, isLayout, isCollapse]);
};
