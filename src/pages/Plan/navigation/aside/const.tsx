import { components } from 'src/common/schema';
import { TasksListNav } from '../../modules/Tasks/parts';

export const MODULES_WITH_OUTPUT: components['schemas']['Module']['type'][] = [
  'tasks',
];

export const modulesChildrenMap: Record<string, JSX.Element> = {
  tasks: <TasksListNav />,
};
