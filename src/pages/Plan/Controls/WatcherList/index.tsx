import { Anchor } from '@appquality/unguess-design-system';

import { Trans, useTranslation } from 'react-i18next';
import { WatcherList as WatcherListComponent } from 'src/common/components/WatcherList';
import { useGetPlansByPidWatchersQuery } from 'src/features/api';
import { usePlanIsApproved } from 'src/hooks/usePlan';
import { useIsWatching } from './hooks/useIsWatching';
import { MemberAddAutocomplete } from './MemberAddAutoComplete';
import { UserList } from './UserList';
import { WatchButton } from './WatchButton';

const WatcherList = ({ planId }: { planId: string }) => {
  const { t } = useTranslation();
  const isWatching = useIsWatching({ planId });
  const { data: watchers, isLoading } = useGetPlansByPidWatchersQuery({
    pid: planId,
  });
  const watchersCount = watchers ? watchers.items.length : 0;

  const isApproved = usePlanIsApproved(planId);

  return (
    <WatcherListComponent
      isWatching={isWatching}
      count={watchersCount}
      isLoading={isLoading}
      i18n={{
        tooltip: {
          title: t('__PLAN_PAGE_WATCHER_LIST_TOOLTIP'),
          description: t('__PLAN_PAGE_WATCHER_LIST_TOOLTIP_DESCRIPTION'),
        },
        modal: {
          title: t('__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE'),
          description: isApproved ? (
            t('__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE_DESCRIPTION_APPROVED')
          ) : (
            <Trans
              i18nKey="__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE_DESCRIPTION"
              components={{
                span: (
                  <Anchor
                    href="/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
            />
          ),
        },
        dropdown: {
          title: t('__PLAN_PAGE_WATCHER_LIST_MODAL_SUGGESTIONS_TITLE'),
          description: t(
            '__PLAN_PAGE_WATCHER_LIST_MODAL_ADD_MEMBERS_INFO_TOOLTIP'
          ),
        },
      }}
    >
      <WatcherListComponent.UserListWrapper>
        <UserList planId={planId} />
      </WatcherListComponent.UserListWrapper>
      <WatcherListComponent.WatchButtonWrapper>
        <WatchButton planId={planId} />
      </WatcherListComponent.WatchButtonWrapper>
      <WatcherListComponent.AutoCompleteWrapper>
        <MemberAddAutocomplete planId={planId} />
      </WatcherListComponent.AutoCompleteWrapper>
    </WatcherListComponent>
  );
};

export { WatcherList };
