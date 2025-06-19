import { Button } from '@appquality/unguess-design-system';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
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
  const { add } = useModule(item.type);

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
