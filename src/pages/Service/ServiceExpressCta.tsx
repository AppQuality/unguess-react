import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { toggleChat } from 'src/common/utils';
import { openDrawer } from 'src/features/express/expressSlice';
import { ServiceCta } from './ServiceCta';

export const ServiceExpressCta = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <ServiceCta
      id="service-details-express-button"
      size="medium"
      isPrimary
      isPill
      onClick={() => {
        dispatch(openDrawer());
        toggleChat(false);
      }}
    >
      {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
    </ServiceCta>
  );
};
