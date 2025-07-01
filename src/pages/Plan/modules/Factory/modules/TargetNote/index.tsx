import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const TargetNoteModule = createModuleDefinition({
  slug: 'target_note',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: '',
  defaultVariant: 'default',
  tab: 'target',
});
