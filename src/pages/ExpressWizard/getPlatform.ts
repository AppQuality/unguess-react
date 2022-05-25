import {
  DESKTOP_MAC,
  DESKTOP_WINDOWS,
  SMARTPHONE_ANDROID,
  SMARTPHONE_IOS,
  TABLET_ANDROID,
  TABLET_IOS,
} from 'src/constants';
import { PlatformObject } from 'src/features/api';
import { WizardModel } from './wizardModel';

export const getPlatform = (values: WizardModel): Array<PlatformObject> => {
  const { withSmartphone, withTablet, withDesktop, isIOS, isAndroid } = values;

  let platforms = [];

  if (withSmartphone) {
    if (!isIOS && !isAndroid) {
      // WhereWeb Step
      platforms.push(SMARTPHONE_ANDROID);
      platforms.push(SMARTPHONE_IOS);
    } else {
      // WhereApp Step
      if (isIOS) {
        platforms.push(SMARTPHONE_IOS);
      }

      if (isAndroid) {
        platforms.push(SMARTPHONE_ANDROID);
      }
    }
  }

  if (withTablet) {
    if (!isIOS && !isAndroid) {
      // WhereWeb Step
      platforms.push(TABLET_ANDROID);
      platforms.push(TABLET_IOS);
    } else {
      // WhereApp Step
      if (isIOS) {
        platforms.push(TABLET_IOS);
      }

      if (isAndroid) {
        platforms.push(TABLET_ANDROID);
      }
    }
  }

  if (withDesktop) {
    platforms.push(DESKTOP_MAC);
    platforms.push(DESKTOP_WINDOWS);
  }

  return platforms;
};
