import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const LiteracyModule = createModuleDefinition({
  slug: 'literacy',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: [
    { level: 'beginner', percentage: 33.33 },
    { level: 'intermediate', percentage: 33.33 },
    { level: 'expert', percentage: 33.33 },
  ],
  defaultVariant: 'default',
  tab: 'target',
});
