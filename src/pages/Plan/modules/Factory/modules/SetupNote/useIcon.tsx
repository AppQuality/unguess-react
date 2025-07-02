import { ReactComponent as NotificationIcon } from 'src/assets/icons/notification.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'setup_note',
    withValidation,
  });

  return <NotificationIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
