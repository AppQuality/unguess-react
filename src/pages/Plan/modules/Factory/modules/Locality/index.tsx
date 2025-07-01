import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const LocalityModule = createModuleDefinition({
  slug: 'locality',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [
    {
      type: 'country',
      values: ['IT'],
    },
  ],
  defaultVariant: 'default',
  tab: 'target',
});
