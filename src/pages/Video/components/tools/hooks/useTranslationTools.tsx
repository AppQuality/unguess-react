import { useParams } from 'react-router-dom';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import {
  GetVideosByVidTranslationApiResponse,
  useGetVideosByVidQuery,
  useGetVideosByVidTranslationQuery,
} from 'src/features/api';
import { useEffect, useState } from 'react';
import { usePreferredLanguage } from '../usePreferredLanguage';
import { useToolsContext } from '../context/ToolsContext';

export const useTranslationTools = () => {
  const { videoId } = useParams();
  const [data, setData] = useState<{
    hasQuickTranslate?: boolean;
    preferredLanguage?: string;
    translation?: GetVideosByVidTranslationApiResponse;
    canQuickTranslate?: boolean;
  }>({
    hasQuickTranslate: false,
    canQuickTranslate: true,
  });

  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION);
  const preferredLanguage = usePreferredLanguage();
  const { language } = useToolsContext();

  const {
    data: video,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery(
    {
      vid: videoId || '',
    },
    {
      skip: !videoId,
    }
  );

  const {
    data: translation,
    isLoading: isLoadingTranslation,
    isError: isErrorTranslation,
  } = useGetVideosByVidTranslationQuery(
    {
      vid: videoId || '',
      ...(language && { lang: language }),
    },
    {
      skip: !hasAIFeatureFlag || !videoId || !language,
    }
  );

  useEffect(() => {
    if (video) {
      const hasQuickTranslate =
        !!preferredLanguage && // Exists a preferred language
        video.language.localeCompare(preferredLanguage) !== 0; // Video language is different from preferred language

      const isPrefTranslated = !!(
        preferredLanguage &&
        translation?.language.localeCompare(preferredLanguage) === 0
      );

      setData({
        hasQuickTranslate,
        preferredLanguage,
        canQuickTranslate: hasQuickTranslate && !isPrefTranslated,
        translation,
      });
    }
  }, [video, translation, preferredLanguage]);

  return {
    isError: !hasAIFeatureFlag || isErrorVideo || isErrorTranslation,
    isProcessing:
      isLoadingVideo || isLoadingTranslation || translation?.processing === 1,
    data,
  };
};
