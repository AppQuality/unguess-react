import { CpReqTemplate } from 'src/features/api';

export const isTemplateTailored = (
  template: Omit<CpReqTemplate, 'category_id'>
) => 'workspace_id' in template && typeof template.workspace_id === 'number';
