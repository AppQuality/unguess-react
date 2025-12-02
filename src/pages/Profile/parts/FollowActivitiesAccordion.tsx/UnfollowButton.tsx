import { Button, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

const UnfollowButton = ({
  isDisabled,
  activityId,
  handleUnfollow,
}: {
  isDisabled: boolean;
  activityId: number;
  handleUnfollow: (id: number) => void;
}) => {
  const { t } = useTranslation();

  const button = (
    <Button
      disabled={isDisabled}
      size="small"
      onClick={() => handleUnfollow(activityId)}
    >
      {t('__PROFILE_PAGE_NOTIFICATIONS_CARD_FOLLOW_ACTIVITIES_BUTTON_TEXT')}
    </Button>
  );
  if (isDisabled) {
    return (
      <Tooltip
        placement="start"
        type="light"
        size="large"
        content={t('__PROFILE_PAGE_UNFOLLOW_BUTTON_DISABLED_TOOLTIP')}
      >
        <div>{button}</div>
      </Tooltip>
    );
  }
  return button;
};

export { UnfollowButton };
