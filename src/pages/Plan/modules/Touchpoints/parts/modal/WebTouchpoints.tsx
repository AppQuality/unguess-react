import { Button, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as WebDesktopIcon } from 'src/assets/icons/touchpoint-web-desktop-icon.svg';
import { ReactComponent as WebTabletIcon } from 'src/assets/icons/touchpoint-web-tablet-icon.svg';
import { ReactComponent as WebSmartphoneIcon } from 'src/assets/icons/touchpoint-web-smartphone-icon.svg';
import { useHandleModalItemClick } from '../../utils';
import { ButtonsContainer } from './ButtonsContainer';

const WebTouchpoints = () => {
  const { t } = useTranslation();
  const handleModalItemClick = useHandleModalItemClick();

  return (
    <>
      <SM isBold>
        {t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_WEB_LABEL'
        )}
      </SM>
      <ButtonsContainer>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('web', 'desktop')}
        >
          <Button.StartIcon>
            <WebDesktopIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_WEB_DESKTOP_BUTTON'
          )}
        </Button>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('web', 'tablet')}
        >
          <Button.StartIcon>
            <WebTabletIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_WEB_TABLET_BUTTON'
          )}
        </Button>
        <Button
          isBasic
          isPill={false}
          onClick={() => handleModalItemClick('web', 'smartphone')}
        >
          <Button.StartIcon>
            <WebSmartphoneIcon />
          </Button.StartIcon>
          {t(
            '__PLAN_PAGE_MODULE_TOUCHPOINTS_ADD_TOUCHPOINT_MODAL_TOUCHPOINT_WEB_SMARTPHONE_BUTTON'
          )}
        </Button>
      </ButtonsContainer>
    </>
  );
};

export { WebTouchpoints };
