import { ReactComponent as AdditionalTargetIcon } from 'src/assets/icons/additional-target-icon.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'additional_target',
    withValidation,
  });

  return <AdditionalTargetIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
