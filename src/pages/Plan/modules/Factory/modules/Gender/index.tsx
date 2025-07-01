import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const GenderModule = createModuleDefinition({
  slug: 'gender',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [
    { gender: 'male', percentage: 0 },
    { gender: 'female', percentage: 0 },
  ],
  defaultVariant: 'default',
  tab: 'target',
});
