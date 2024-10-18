import { useParams } from 'react-router-dom';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import {
  useGetVideosByVidQuery,
  useGetVideosByVidTranslationQuery,
} from 'src/features/api';
import { usePreferredLanguage } from '../usePreferredLanguage';
import { useToolsContext } from '../context/ToolsContext';

export const useTranslationTools = () => {
  const { videoId } = useParams();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION);
  const preferredLanguage = usePreferredLanguage();
  const { isOpen, setIsOpen, language, setLanguage } = useToolsContext();

  const { data: translation, isLoading: isLoadingTranslation } =
    useGetVideosByVidTranslationQuery(
      {
        vid: videoId || '',
        ...(language && { lang: language }),
      },
      {
        skip: !hasAIFeatureFlag || !language || !preferredLanguage,
      }
    );
  const { data: video } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const canTranslate =
    !!preferredLanguage &&
    video &&
    video.language.localeCompare(preferredLanguage) !== 0 &&
    (!translation ||
      translation.language.localeCompare(preferredLanguage) !== 0);
  const isTranslating =
    translation &&
    translation.language === preferredLanguage &&
    translation.processing === 1;

  const isProcessing = isLoadingTranslation || translation?.processing === 1;
};
