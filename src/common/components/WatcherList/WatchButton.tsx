import { Button, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

import { ReactComponent as EyeIconFill } from 'src/assets/icons/eye-icon-fill.svg';
import { ReactComponent as EyeIconSlash } from 'src/assets/icons/eye-icon-slash.svg';
import { useGetUsersMeQuery } from 'src/features/api';

const WatchButton = ({
  isWatching,
  isLastOne,
  onClick,
  isDisabled,
}: {
  isWatching: boolean;
  isDisabled: boolean;
  isLastOne: boolean;
  onClick: () => void;
}) => {
  const { data: currentUser } = useGetUsersMeQuery();
  const { t } = useTranslation();

  const isLastWatcher = isWatching && isLastOne;

  const iconColor = (() => {
    if (isDisabled) return appTheme.palette.grey[400];
    if (!isWatching) return '#fff';
    return undefined;
  })();

  const EyeIcon = isWatching ? EyeIconSlash : EyeIconFill;

  if (!currentUser) return null;

  const button = (
    <Button
      isStretched
      disabled={isDisabled}
      isPrimary={!isWatching}
      onClick={onClick}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <EyeIcon color={iconColor} />

        {isWatching
          ? t('__PLAN_PAGE_WATCHER_LIST_MODAL_UNFOLLOW_BUTTON')
          : t('__PLAN_PAGE_WATCHER_LIST_MODAL_FOLLOW_BUTTON')}
      </div>
    </Button>
  );

  if (isDisabled) {
    return (
      <Tooltip
        placement="start"
        type="light"
        size="large"
        content={
          isLastWatcher
            ? t(
                '__PLAN_PAGE_WATCHER_LIST_MODAL_UNFOLLOW_BUTTON_DISABLED_TOOLTIP'
              )
            : t('__PLAN_PAGE_WATCHER_LIST_MODAL_FOLLOW_BUTTON_DISABLED_TOOLTIP')
        }
      >
        {/* the following div is necessary to make Tooltip work with disabled Button */}
        <div>{button}</div>
      </Tooltip>
    );
  }

  return button;
};

export { WatchButton };
