import { WatcherList } from 'src/common/components/WatcherList';
import { useAvailableUsers } from './hooks/useAvailableUsers';
import { useIsLastOne } from './hooks/useIsLastOne';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const UserItem = ({
  campaignId,
  user,
}: {
  campaignId: string;
  user: {
    id: number;
    name: string;
    email: string;
    image?: string;
    isInternal: boolean;
    isMe?: boolean;
  };
}) => {
  const isLastOne = useIsLastOne({ campaignId });

  const { data: availableUsers } = useAvailableUsers({
    campaignId,
  });

  const { removeWatcher } = useRemoveWatcher();

  return (
    <WatcherList.UserItemComponent
      onClick={() =>
        removeWatcher({ campaignId, profileId: user.id.toString() })
      }
      hideRemoveButton={
        availableUsers.map((u) => u.profile_id).includes(user.id) === false
      }
      isLastOne={isLastOne}
      user={user}
    />
  );
};

export { UserItem };
