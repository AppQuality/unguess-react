import { MD, Skeleton, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  useGetPlansByPidWatchersQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import { usePlanIsApproved } from 'src/hooks/usePlan';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as Empty } from './assets/Empty.svg';
import { UserItem } from './UserItem';

const UserItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
`;

const EmptyState = ({ watchers }: { watchers?: number }) => {
  const { t } = useTranslation();
  const appTheme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${appTheme.space.sm} 0`,
      }}
    >
      <Empty />
      {(!watchers || watchers === 0) && (
        <>
          <SM isBold>
            {t('__PLAN_PAGE_WATCHER_LIST_MODAL_NO_WATCHERS_TITLE')}
          </SM>
          <SM style={{ color: appTheme.palette.grey[500] }}>
            {t('__PLAN_PAGE_WATCHER_LIST_MODAL_NO_WATCHERS_DESCRIPTION')}
          </SM>
        </>
      )}

      {watchers && watchers === 1 && (
        <>
          <SM isBold>
            {t('__PLAN_PAGE_WATCHER_LIST_MODAL_ONLY_ONE_WATCHER_TITLE')}
          </SM>
          <SM style={{ color: appTheme.palette.grey[500] }}>
            {t('__PLAN_PAGE_WATCHER_LIST_MODAL_ONLY_ONE_WATCHER_DESCRIPTION')}
          </SM>
        </>
      )}
    </div>
  );
};

const UserList = ({ planId }: { planId: string }) => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetUsersMeQuery();
  const { data, isLoading } = useGetPlansByPidWatchersQuery({
    pid: planId,
  });

  const isApproved = usePlanIsApproved(planId);
  if (isLoading) return <Skeleton height="100" />;

  if (!data || data.items.length === 0) return <EmptyState />;

  return (
    <UserItemContainer>
      <MD isBold>
        {isApproved
          ? t('__PLAN_PAGE_WATCHER_LIST_MODAL_WATCHERS_TITLE_APPROVED')
          : t('__PLAN_PAGE_WATCHER_LIST_MODAL_WATCHERS_TITLE')}
      </MD>

      {[...data.items]
        .sort((a, b) => {
          const aName = `${a.name} ${a.surname}`.toLowerCase();
          const bName = `${b.name} ${b.surname}`.toLowerCase();

          return aName.localeCompare(bName);
        })
        .map((user) => (
          <UserItem
            planId={planId}
            key={user.id}
            user={{
              ...user,
              name: `${user.name} ${user.surname}`,
              isMe: currentUser?.profile_id === user.id,
            }}
          />
        ))}
      {data.items.length === 1 && !isApproved && (
        <EmptyState watchers={data.items.length} />
      )}
    </UserItemContainer>
  );
};

export { UserList };
