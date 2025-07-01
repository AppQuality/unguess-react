import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const TasksModule = createModuleDefinition({
  slug: 'tasks',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'instructions',
});
