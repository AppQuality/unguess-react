import { getColor } from '@appquality/unguess-design-system';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { components } from 'src/common/schema';
import { useTheme } from 'styled-components';

const useErrorInThisModule = (
  module_type: components['schemas']['Module']['type']
) => {
  const errorInThisModule = useAppSelector(
    (state) =>
      Object.fromEntries(
        Object.entries(state.planModules.errors).filter(([key]) => {
          if (key.startsWith(`${module_type}.`) || key === module_type) {
            return true;
          }
          return false;
        })
      ) || {},
    shallowEqual
  );

  return errorInThisModule;
};

const useModuleValue = (
  module_type: components['schemas']['Module']['type']
): components['schemas']['Module']['output'] | undefined =>
  useAppSelector(
    (state) => state.planModules.records[`${module_type}`]?.output
  );

const useIconColor = ({
  module_type,
  withValidation,
}: {
  module_type: components['schemas']['Module']['type'];
  withValidation: boolean;
}) => {
  const theme = useTheme();
  const value = useModuleValue(module_type);
  const errorInThisModule = useErrorInThisModule(module_type);

  if (!withValidation) {
    return getColor(theme.colors.primaryHue, 600);
  }

  const hasErrors =
    errorInThisModule && Object.keys(errorInThisModule).length > 0;

  const hasValues = !!value;

  if (hasErrors) return getColor(theme.palette.red[900]);
  if (!hasErrors && !hasValues) return getColor(theme.palette.grey, 600);

  return getColor(theme.colors.primaryHue, 600);
};

export default useIconColor;
