import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useTitle from './useTitle';

export const InternetMobileModule = createModuleDefinition({
  slug: 'mobile_internet',
  Component,
  useTitle,
  useIcon,
  defaultData: [],
  defaultVariant: 'default',
  tab: 'target',
});
