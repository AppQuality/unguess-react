import { ReactComponent as OutOfScopeIcon } from 'src/assets/icons/x-circle.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'out_of_scope',
    withValidation,
  });

  return <OutOfScopeIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
