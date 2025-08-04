import { ReactComponent as HomeInternetIcon } from 'src/assets/icons/home-internet.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'home_internet',
    withValidation,
  });

  return <HomeInternetIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
