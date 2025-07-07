import { ReactComponent as TouchpointsIcon } from 'src/assets/icons/touchpoints-icon.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'touchpoints',
    withValidation,
  });

  return <TouchpointsIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
