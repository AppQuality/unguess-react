import { Button } from '@appquality/unguess-design-system';
import { components } from 'src/common/schema';
import { useModuleAdd } from 'src/features/modules/useModuleAdd';
import { getIconFromModuleType, getTitleFromModuleType } from '../../../utils';
import { usePlanNavContext } from '../context';

const AddBlockModalItem = ({
  item,
}: {
  item: {
    type: components['schemas']['Module']['type'];
    enabled: boolean;
  };
}) => {
  const { setModalRef } = usePlanNavContext();
  const title = getTitleFromModuleType(item.type);
  const icon = getIconFromModuleType(item.type, false);
  const { add } = useModuleAdd(item.type);

  return (
    <Button
      isBasic
      isPill={false}
      onClick={() => {
        setModalRef(null);
        add();
      }}
      disabled={!item.enabled}
    >
      {icon && <Button.StartIcon>{icon}</Button.StartIcon>}
      {title}
    </Button>
  );
};

export { AddBlockModalItem };
