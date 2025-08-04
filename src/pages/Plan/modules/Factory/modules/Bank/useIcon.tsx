import { ReactComponent as BankIcon } from '@zendeskgarden/svg-icons/src/16/credit-card-stroke.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'bank',
    withValidation,
  });

  return <BankIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
