import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const TargetSizeModule = createModuleDefinition({
  slug: 'language',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: 'en',
  defaultVariant: 'default',
  tab: 'target',
});
