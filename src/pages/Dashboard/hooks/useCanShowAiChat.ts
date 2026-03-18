import { isDev } from 'src/common/isDevEnvironment';
import { FEATURE_FLAG_MASTRA_WORKFLOW } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';

export const useCanShowAiChat = () => {
  const { hasFeatureFlag } = useFeatureFlag();

  if (isDev() && hasFeatureFlag(FEATURE_FLAG_MASTRA_WORKFLOW)) {
    return true;
  }

  return false;
};
