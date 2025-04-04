import { CpReqTemplate } from 'src/features/api';

export const isTemplateTailored = (template: CpReqTemplate) =>
  'workspace_id' in template && typeof template.workspace_id === 'number';
