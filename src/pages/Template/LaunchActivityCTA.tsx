import { useTranslation } from 'react-i18next';
import { Button } from '@appquality/unguess-design-system';

export const LaunchActivityCTA = ({
  handleLaunchActivity,
}: {
  handleLaunchActivity: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Button
      size="medium"
      isPrimary
      isAccent
      onClick={() => {
        handleLaunchActivity();
      }}
    >
      {t('__TEMPLATE_LAUNCH_ACTIVITY_BUTTON')}
    </Button>
  );
};
