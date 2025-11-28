import { WatcherList } from 'src/common/components/WatcherList';
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

  const { removeWatcher } = useRemoveWatcher();

  return (
    <WatcherList.UserItemComponent
      onClick={() =>
        removeWatcher({ campaignId, profileId: user.id.toString() })
      }
      isLastOne={isLastOne}
      user={user}
    />
  );
};

export { UserItem };
