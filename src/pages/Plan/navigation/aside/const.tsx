import { components } from 'src/common/schema';
import { TasksListNav } from 'src/pages/Plan/modules/Factory/modules/Tasks/Component/parts';
import { TouchpointsListNav } from 'src/pages/Plan/modules/Factory/modules/Touchpoints/Component/parts';

export const MODULES_WITH_OUTPUT: components['schemas']['Module']['type'][] = [
  'tasks',
  'touchpoints',
];

export const modulesChildrenMap: Record<string, JSX.Element> = {
  tasks: <TasksListNav />,
  touchpoints: <TouchpointsListNav />,
};
