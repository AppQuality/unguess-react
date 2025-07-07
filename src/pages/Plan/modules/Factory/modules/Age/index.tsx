import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const AgeModule = createModuleDefinition({
  slug: 'age',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [
    {
      min: 16,
      max: 17,
      percentage: 0,
    },
    {
      min: 18,
      max: 24,
      percentage: 0,
    },
    {
      min: 25,
      max: 34,
      percentage: 0,
    },
    {
      min: 35,
      max: 54,
      percentage: 0,
    },
    {
      min: 55,
      max: 70,
      percentage: 0,
    },
  ],
  defaultVariant: 'default',
  tab: 'target',
});
