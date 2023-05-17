import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

export const ServiceContactUsCta = ({
  onCtaClick,
}: {
  onCtaClick: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Button size="medium" isPrimary isAccent onClick={onCtaClick}>
      {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
    </Button>
  );
};
