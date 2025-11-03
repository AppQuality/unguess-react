import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EyeIconFill } from 'src/assets/icons/eye-icon-fill.svg';
import { ReactComponent as EyeIconSlash } from 'src/assets/icons/eye-icon-slash.svg';
import {
  useGetUsersMeQuery,
  usePostPlansByPidWatchersMutation,
} from 'src/features/api';
import { useIsWatching } from './hooks/useIsWatching';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const WatchButton = ({ planId }: { planId: string }) => {
  const isWatching = useIsWatching({ planId });
  const { removeWatcher } = useRemoveWatcher();
  const [addUser] = usePostPlansByPidWatchersMutation();
  const { data: currentUser } = useGetUsersMeQuery();
  const { t } = useTranslation();

  if (!currentUser) return null;
  return (
    <Button
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
          });
        }
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {isWatching ? <EyeIconSlash /> : <EyeIconFill color="#fff" />}
        {isWatching
          ? t(
              '__PLAN_PAGE_WATCHER_LIST_MODAL_UNFOLLOW_BUTTON',
              'Unfollow this activity'
            )
          : t(
              '__PLAN_PAGE_WATCHER_LIST_MODAL_FOLLOW_BUTTON',
              'Follow this activity'
            )}
      </div>
    </Button>
  );
};

export { WatchButton };
