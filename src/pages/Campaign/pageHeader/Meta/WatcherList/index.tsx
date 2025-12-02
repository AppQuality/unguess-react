import { Anchor } from '@appquality/unguess-design-system';

import { Trans, useTranslation } from 'react-i18next';
import { WatcherList as WatcherListComponent } from 'src/common/components/WatcherList';
import { useGetCampaignsByCidWatchersQuery } from 'src/features/api';
import { useIsWatching } from './hooks/useIsWatching';
import { MemberAddAutocomplete } from './MemberAddAutoComplete';
import { UserList } from './UserList';
import { WatchButton } from './WatchButton';

const WatcherList = ({ campaignId }: { campaignId: string }) => {
  const { t } = useTranslation();
  const isWatching = useIsWatching({ campaignId });
  const { data: watchers, isLoading } = useGetCampaignsByCidWatchersQuery({
    cid: campaignId,
  });
  const watchersCount = watchers ? watchers.items.length : 0;

  return (
    <WatcherListComponent
      size="medium"
      isWatching={isWatching}
      count={watchersCount}
      isLoading={isLoading}
      i18n={{
        tooltip: {
          title: t('__PLAN_PAGE_WATCHER_LIST_TOOLTIP'),
          description: t('__PLAN_PAGE_WATCHER_LIST_TOOLTIP_DESCRIPTION'),
        },
        modal: {
          title: t('__CAMPAIGN_PAGE_WATCHER_LIST_MODAL_TITLE'),
          description: (
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
          title: t('__CAMPAIGN_PAGE_WATCHER_LIST_MODAL_SUGGESTIONS_TITLE'),
          description: t(
            '__CAMPAIGN_PAGE_WATCHER_LIST_MODAL_ADD_MEMBERS_INFO_TOOLTIP'
          ),
        },
      }}
    >
      <WatcherListComponent.UserListWrapper>
        <UserList campaignId={campaignId} />
      </WatcherListComponent.UserListWrapper>
      <WatcherListComponent.WatchButtonWrapper>
        <WatchButton campaignId={campaignId} />
      </WatcherListComponent.WatchButtonWrapper>
      <WatcherListComponent.AutoCompleteWrapper>
        <MemberAddAutocomplete campaignId={campaignId} />
      </WatcherListComponent.AutoCompleteWrapper>
    </WatcherListComponent>
  );
};

export { WatcherList };
