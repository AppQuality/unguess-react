import { createModuleDefinition } from '../../ModuleDefinition';
import Component from './Component';
import useIcon from './useIcon';
import useSubtitle from './useSubtitle';
import useTitle from './useTitle';

export const InstructionNoteModule = createModuleDefinition({
  slug: 'instruction_note',
  Component,
  useTitle,
  useIcon,
  useSubtitle,
  defaultData: '',
  defaultVariant: 'default',
  tab: 'instructions',
  priority: 1000,
});
