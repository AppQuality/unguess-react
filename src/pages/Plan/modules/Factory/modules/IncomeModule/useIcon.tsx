import { ReactComponent as ArrowTrending } from 'src/assets/icons/arrow-trending.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'annual_income_range',
    withValidation,
  });

  return <ArrowTrending color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
