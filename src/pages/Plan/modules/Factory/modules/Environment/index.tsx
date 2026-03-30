import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const EnvironmentsModule = createModuleDefinition({
  slug: 'environment',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: { envType: 'production' },
  defaultVariant: 'default',
  tab: 'setup',
});
