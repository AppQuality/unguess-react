import { WatcherList } from 'src/common/components/WatcherList';
import { usePlanIsApproved } from 'src/hooks/usePlan';
import { useIsLastOne } from './hooks/useIsLastOne';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const UserItem = ({
  planId,
  user,
}: {
  planId: string;
  user: {
    id: number;
    name: string;
    email: string;
    image?: string;
    isInternal: boolean;
    isMe?: boolean;
  };
}) => {
  const isLastOne = useIsLastOne({ planId });
  const isApproved = usePlanIsApproved(planId);

  const { removeWatcher } = useRemoveWatcher();

  return (
    <WatcherList.UserItemComponent
      onClick={() => removeWatcher({ planId, profileId: user.id.toString() })}
      hideRemoveButton={isApproved}
      isLastOne={isLastOne}
      user={user}
    />
  );
};

export { UserItem };
