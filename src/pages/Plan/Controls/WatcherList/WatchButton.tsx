import {
  Button,
  Tooltip,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

import { ReactComponent as EyeIconFill } from 'src/assets/icons/eye-icon-fill.svg';
import { ReactComponent as EyeIconSlash } from 'src/assets/icons/eye-icon-slash.svg';
import {
  useGetUsersMeQuery,
  usePostPlansByPidWatchersMutation,
} from 'src/features/api';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useIsLastOne } from './hooks/useIsLastOne';
import { useIsWatching } from './hooks/useIsWatching';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const WatchButton = ({ planId }: { planId: string }) => {
  const isWatching = useIsWatching({ planId });
  const isLastOne = useIsLastOne({ planId });
  const { addToast } = useToast();
  const { removeWatcher } = useRemoveWatcher();
  const [addUser] = usePostPlansByPidWatchersMutation();
  const hasWorkspaceAccess = useCanAccessToActiveWorkspace();
  const { data: currentUser } = useGetUsersMeQuery();
  const { t } = useTranslation();

  const isLastWatcher = isWatching && isLastOne;

  const iconColor = (() => {
    if (!isWatching) return '#fff';
    if (isLastOne) return appTheme.palette.grey[400];
    return undefined;
  })();

  const EyeIcon = isWatching ? EyeIconSlash : EyeIconFill;

  if (!currentUser) return null;

  const button = (
    <Button
      isStretched
      disabled={!!hasWorkspaceAccess !== !!isLastWatcher}
      isPrimary={!isWatching}
      onClick={() => {
        if (isWatching) {
          removeWatcher({
            planId,
            profileId: currentUser.profile_id.toString(),
          });
        } else {
          addUser({
            pid: planId,
            body: { users: [{ id: currentUser.profile_id }] },
          })
            .unwrap()
            .then(() => {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="success"
                    message={t(
                      '__PLAN_PAGE_WATCHER_LIST_ADD_SELF_TOAST_MESSAGE'
                    )}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            })
            .catch(() => {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="error"
                    message={t(
                      '__PLAN_PAGE_WATCHER_LIST_ADD_SELF_TOAST_ERROR_MESSAGE'
                    )}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            });
        }
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <EyeIcon color={iconColor} />

        {isWatching
          ? t('__PLAN_PAGE_WATCHER_LIST_MODAL_UNFOLLOW_BUTTON')
          : t('__PLAN_PAGE_WATCHER_LIST_MODAL_FOLLOW_BUTTON')}
      </div>
    </Button>
  );

  // condition is true only when one value is truthy and the other is falsy, otherwise it's false
  if (!!hasWorkspaceAccess !== !!isLastWatcher) {
    return (
      <Tooltip
        placement="start"
        type="light"
        size="medium"
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
