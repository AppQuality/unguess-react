import { ReactComponent as LocationIcon } from '@zendeskgarden/svg-icons/src/16/location-fill.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'locality',
    withValidation,
  });

  return <LocationIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
