import { ReactComponent as BrowserIcon } from '@zendeskgarden/svg-icons/src/16/globe-fill.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'browser',
    withValidation,
  });

  return <BrowserIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
