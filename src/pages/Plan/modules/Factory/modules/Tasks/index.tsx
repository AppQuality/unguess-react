import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import { TasksListNav } from './Component/parts';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const TasksModule = createModuleDefinition({
  slug: 'tasks',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  NavChildren: TasksListNav,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'instructions',
});
