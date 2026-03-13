import { ReactComponent as TouchpointsIcon } from 'src/assets/icons/touchpoints-icon.svg';
import { useModule } from 'src/features/modules/useModule';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const { value } = useModule('touchpoints');
  const color = useIconColor({
    module_type: 'touchpoints',
    withValidation,
  });

  if (value?.variant === 'hidden') {
    return null;
  }

  return <TouchpointsIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
