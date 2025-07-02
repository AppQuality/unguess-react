import { ReactComponent as TargetIcon } from 'src/assets/icons/user-follow.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'target',
    withValidation,
  });

  return <TargetIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
