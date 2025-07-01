import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';

export const TitleModule = createModuleDefinition({
  slug: 'title',
  Component,
  useTitle: () => '',
  useIcon: () => null,
  defaultData: '',
  defaultVariant: 'default',
  tab: 'none',
});
