import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useTitle from './useTitle';

export const BankModule = createModuleDefinition({
  slug: 'bank',
  Component,
  useTitle,
  useIcon,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'target',
});
