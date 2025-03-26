import { useTranslation } from 'react-i18next';
import { Button } from '@appquality/unguess-design-system';

export const LaunchActivityCTA = () => {
  const { t } = useTranslation();
  return (
    <Button
      className="service-details-express-button"
      size="medium"
      isPrimary
      isAccent
      onClick={() => {
        // dispatch(openDrawer());
      }}
    >
      {t('__TEMPLATE_LAUNCH_ACTIVITY_BUTTON')}
    </Button>
  );
};
