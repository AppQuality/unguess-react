import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import { TouchpointsListNav } from './Component/parts';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const TouchpointsModule = createModuleDefinition({
  slug: 'touchpoints',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  NavChildren: TouchpointsListNav,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'setup',
});
