import { usePostWorkspacesByWidTemplatesMutation } from 'src/features/api';

const MUTATION_CACHE_KEY = 'shared-save-plan-as-template';

const useSaveTemplate = () => {
  const [save, { data, reset }] = usePostWorkspacesByWidTemplatesMutation({
    fixedCacheKey: MUTATION_CACHE_KEY,
  });
  const isSubmitSuccessful = Boolean(data);

  return {
    save,
    data,
    reset,
    isSubmitSuccessful,
  };
};

export { useSaveTemplate };
