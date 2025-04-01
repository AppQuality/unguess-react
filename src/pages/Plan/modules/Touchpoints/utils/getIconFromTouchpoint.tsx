import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AppDesktopIcon } from 'src/assets/icons/touchpoint-app-desktop-icon.svg';
import { ReactComponent as AppSmartphoneIcon } from 'src/assets/icons/touchpoint-app-smartphone-icon.svg';
import { ReactComponent as AppTabletIcon } from 'src/assets/icons/touchpoint-app-tablet-icon.svg';
import { ReactComponent as WebDesktopIcon } from 'src/assets/icons/touchpoint-web-desktop-icon.svg';
import { ReactComponent as WebTabletIcon } from 'src/assets/icons/touchpoint-web-tablet-icon.svg';
import { ReactComponent as WebSmartphoneIcon } from 'src/assets/icons/touchpoint-web-smartphone-icon.svg';
import { components } from 'src/common/schema';
import { useModuleTouchpoints } from '../hooks';

const getIconColor = () => {
  const { error } = useModuleTouchpoints();

  const hasErrors =
    (error &&
      typeof error === 'object' &&
      Object.keys(error).some((k) => k.startsWith('touchpoints'))) ??
    false;

  // TODO: Handle grey color

  if (hasErrors) return getColor(appTheme.colors.dangerHue, 900);
  return getColor(appTheme.colors.primaryHue, 600);
};

const getIconFromTouchpointOutput = (
  touchpoint: components['schemas']['OutputModuleTouchpoints'] & { key: number }
) => {
  const { kind, form_factor } = touchpoint;
  const color = getIconColor();

  switch (form_factor) {
    case 'desktop':
      if (kind === 'web') return <WebDesktopIcon color={color} />;
      if (kind === 'app') return <AppDesktopIcon color={color} />;
      return null;
    case 'tablet':
      if (kind === 'web') return <WebTabletIcon color={color} />;
      if (kind === 'app') return <AppTabletIcon color={color} />;
      return null;
    case 'smartphone':
      if (kind === 'web') return <WebSmartphoneIcon color={color} />;
      if (kind === 'app') return <AppSmartphoneIcon color={color} />;
      return null;
    default:
      return null;
  }
};

export { getIconFromTouchpointOutput };
