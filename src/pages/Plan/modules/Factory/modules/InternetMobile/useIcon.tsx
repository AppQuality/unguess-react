import { ReactComponent as PhoneIcon } from '@zendeskgarden/svg-icons/src/16/phone-fill.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'mobile_internet',
    withValidation,
  });

  return <PhoneIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
