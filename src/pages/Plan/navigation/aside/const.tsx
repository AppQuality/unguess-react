import { components } from 'src/common/schema';
import { TasksListNav } from '../../modules/Tasks/parts';
import { TouchpointsListNav } from '../../modules/Touchpoints/parts';

export const MODULES_WITH_OUTPUT: components['schemas']['Module']['type'][] = [
  'tasks',
  'touchpoints',
];

export const modulesChildrenMap: Record<string, JSX.Element> = {
  tasks: <TasksListNav />,
  touchpoints: <TouchpointsListNav />,
};
