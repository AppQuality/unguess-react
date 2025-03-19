import { Button } from '@appquality/unguess-design-system';
import { getIconFromModuleType, getTitleFromModuleType } from '../../utils';
import { usePlanNavContext } from './context';

const AddBlockModalItem = ({
  item,
}: {
  item: {
    type: string;
    enabled: boolean;
  };
}) => {
  const { setModalRef } = usePlanNavContext();
  const title = getTitleFromModuleType(item.type);
  const icon = getIconFromModuleType(item.type);

  return (
    <Button
      isBasic
      isPill={false}
      onClick={() => {
        setModalRef(null);
      }}
      disabled={!item.enabled}
    >
      {icon && <Button.StartIcon>{icon}</Button.StartIcon>}
      {title}
    </Button>
  );
};

export { AddBlockModalItem };
