import { useTranslation } from 'react-i18next';
import { WaterButton } from 'src/common/components/waterButton';

export const ServiceContactUsCta = ({
  onCtaClick,
}: {
  onCtaClick: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <WaterButton size="medium" isPrimary isPill onClick={onCtaClick}>
      {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
    </WaterButton>
  );
};
