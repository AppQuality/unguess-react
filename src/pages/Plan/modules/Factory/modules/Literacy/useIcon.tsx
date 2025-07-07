import { ReactComponent as LiteracyIcon } from 'src/assets/icons/literacy-icon.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'literacy',
    withValidation,
  });

  return <LiteracyIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
