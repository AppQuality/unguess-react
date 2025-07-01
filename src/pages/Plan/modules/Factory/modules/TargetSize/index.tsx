import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const TargetSizeModule = createModuleDefinition({
  slug: 'target',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: 5,
  defaultVariant: 'default',
  tab: 'target',
});
