import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const BrowserModule = createModuleDefinition({
  slug: 'browser',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [
    { name: 'chrome', percentage: 25 },
    { name: 'firefox', percentage: 25 },
    { name: 'safari', percentage: 25 },
    { name: 'edge', percentage: 25 },
  ],
  defaultVariant: 'default',
  tab: 'setup',
});
