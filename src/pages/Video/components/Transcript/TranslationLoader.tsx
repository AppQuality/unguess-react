import { Skeleton, SM } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useGetVideosByVidTranslationQuery } from 'src/features/api';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import { useToolsContext } from '../tools/context/ToolsContext';
import { usePreferredLanguage } from '../tools/usePreferredLanguage';

export const TranslationLoader = () => {
  const { videoId } = useParams();
  const { language } = useToolsContext();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION);
  const preferredLanguage = usePreferredLanguage();
  const { data } = useGetVideosByVidTranslationQuery(
    {
      vid: videoId || '',
      ...(language && { lang: language }),
    },
    {
      skip: !hasAIFeatureFlag || !language || !preferredLanguage,
    }
  );

  if (!data?.processing) return null;

  return (
    <div>
      <SM
        isBold
        color={appTheme.palette.grey[700]}
        style={{ marginBottom: appTheme.space.md }}
      >
        Translation in progress....
      </SM>
      <Skeleton
        width="100%"
        height="6px"
        style={{
          backgroundColor: appTheme.palette.teal[700],
          borderRadius: appTheme.borderRadii.lg,
        }}
      />
    </div>
  );
};
