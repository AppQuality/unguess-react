import { ReactComponent as GasIcon } from 'src/assets/icons/gas_module_icon.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'gas_supply',
    withValidation,
  });

  return <GasIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
