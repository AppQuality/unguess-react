import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AppDesktopIcon } from 'src/assets/icons/touchpoint-app-desktop-icon.svg';
import { ReactComponent as AppSmartphoneIcon } from 'src/assets/icons/touchpoint-app-smartphone-icon.svg';
import { ReactComponent as AppTabletIcon } from 'src/assets/icons/touchpoint-app-tablet-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';

const AppTouchpoints = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <SM color={appTheme.palette.grey[600]}>
        {t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_APP_LABEL'
        ).toUpperCase()}
      </SM>
      <ButtonsContainer>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('app', 'desktop')}
        >
          <Button.StartIcon>
            <AppDesktopIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_APP_DESKTOP_BUTTON'
          )}
        </Button>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('app', 'tablet')}
        >
          <Button.StartIcon>
            <AppTabletIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_APP_TABLET_BUTTON'
          )}
        </Button>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('app', 'smartphone')}
        >
          <Button.StartIcon>
            <AppSmartphoneIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_APP_SMARTPHONE_BUTTON'
          )}
        </Button>
      </ButtonsContainer>
    </>
  );
};

export { AppTouchpoints };
