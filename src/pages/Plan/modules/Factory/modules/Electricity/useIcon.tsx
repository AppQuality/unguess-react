import { ReactComponent as PlugIcon } from '@zendeskgarden/svg-icons/src/16/plug-fill.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'elettricity_supply',
    withValidation,
  });

  return <PlugIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
