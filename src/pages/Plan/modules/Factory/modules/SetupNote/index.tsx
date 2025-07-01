import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const SetupNoteModule = createModuleDefinition({
  slug: 'setup_note',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: '',
  defaultVariant: 'default',
  tab: 'setup',
});
