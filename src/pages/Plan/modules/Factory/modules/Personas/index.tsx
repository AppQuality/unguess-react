import { createModuleDefinition } from '../../ModuleDefinition';
import Personas from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const PersonasModule = createModuleDefinition({
  slug: 'personas',
  Component: Personas,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'setup',
});
