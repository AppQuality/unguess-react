import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useTitle from './useTitle';

export const EmploymentModule = createModuleDefinition({
  slug: 'employment',
  Component,
  useTitle,
  useIcon,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'target',
});
