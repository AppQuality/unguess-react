import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ServiceCta } from './ServiceCta';

export const ServiceMailToCta = () => {
  const { t } = useTranslation();

  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  return (
    <ServiceCta
      size="medium"
      isPrimary
      isPill
      onClick={() => {
        window.location.href = `mailto:${
          activeWorkspace?.csm.email || 'info@unguess.io'
        }`;
      }}
    >
      {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
    </ServiceCta>
  );
};
