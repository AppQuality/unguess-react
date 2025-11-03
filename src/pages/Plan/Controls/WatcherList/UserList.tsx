import { MD, Skeleton } from '@appquality/unguess-design-system';

import { styled } from 'styled-components';

import { useTranslation } from 'react-i18next';
import {
  useGetPlansByPidWatchersQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import { UserItem } from './UserItem';

const UserItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
`;

const EmptyState = () => <>Empty</>;

const UserList = ({ planId }: { planId: string }) => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetUsersMeQuery();
  const { data, isLoading } = useGetPlansByPidWatchersQuery({
    pid: planId,
  });

  if (isLoading) return <Skeleton height="100" />;

  if (!data || data.items.length === 0) return <EmptyState />;

  return (
    <UserItemContainer>
      <MD isBold>
        {t(
          '__PLAN_PAGE_WATCHER_LIST_MODAL_WATCHERS_TITLE',
          'People following this activity'
        )}
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
    </UserItemContainer>
  );
};

export { UserList };
