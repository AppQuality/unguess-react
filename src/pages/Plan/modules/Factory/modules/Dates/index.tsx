import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';

export const DatesModule = createModuleDefinition({
  slug: 'dates',
  Component,
  useTitle: () => '',
  useIcon: () => null,
  defaultData: {
    start: '',
  },
  defaultVariant: 'default',
  tab: 'none',
});
