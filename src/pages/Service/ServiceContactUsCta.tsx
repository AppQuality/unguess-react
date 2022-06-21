import { useTranslation } from 'react-i18next';
import { ServiceCta } from './ServiceCta';

export const ServiceContactUsCta = ({
  onCtaClick,
}: {
  onCtaClick: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <ServiceCta size="medium" isPrimary isPill onClick={onCtaClick}>
      {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
    </ServiceCta>
  );
};
