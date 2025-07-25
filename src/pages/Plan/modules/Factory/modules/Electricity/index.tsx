import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useTitle from './useTitle';

export const ElectricityModule = createModuleDefinition({
  slug: 'elettricity_supply',
  Component,
  useTitle,
  useIcon,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'target',
});
