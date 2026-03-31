import { ReactComponent as GlobeIcon } from '@zendeskgarden/svg-icons/src/16/signpost-fill.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'environment',
    withValidation,
  });

  return <GlobeIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
