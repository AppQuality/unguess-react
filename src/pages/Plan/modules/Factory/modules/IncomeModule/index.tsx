import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useTitle from './useTitle';

export const IncomeModule = createModuleDefinition({
  slug: 'annual_income_range',
  Component,
  useTitle,
  useIcon,
  defaultData: [
    {
      min: 0,
      max: 25000,
      percentage: 0,
    },
    {
      min: 25001,
      max: 50000,
      percentage: 0,
    },
    {
      min: 50001,
      max: 999999999,
      percentage: 0,
    },
  ],
  defaultVariant: 'default',
  tab: 'target',
});
