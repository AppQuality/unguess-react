import { Button, Tooltip } from '@appquality/unguess-design-system';
import { set } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SparkleIcon } from 'src/assets/icons/sparkle-icon.svg';
import {
  unguessApi,
  usePostCampaignsByCidVideosAndVidSentimentsMutation,
} from 'src/features/api';

export const AutoSentiment = ({
  videoId,
  campaignId,
}: {
  videoId: string;
  campaignId: string;
}) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const [generateSentiment] =
    usePostCampaignsByCidVideosAndVidSentimentsMutation();

  return (
    <Tooltip
      content={t('__VIDEO_TRANSCRIPT_AUTO_SENTIMENT_TOOLTIP')}
      placement="bottom"
      type="light"
      size="medium"
    >
      <Button
        isAccent
        isBasic
        size="small"
        onClick={() => {
          setIsGenerating(true);
          generateSentiment({
            cid: campaignId,
            vid: videoId,
            body: {
              videoId,
            },
          })
            .unwrap()
            .then(() => {
              setIsGenerating(false);
            });
        }}
        disabled={isGenerating}
      >
        <Button.StartIcon>
          <SparkleIcon />
        </Button.StartIcon>

        {isGenerating
          ? t('__VIDEO_TRANSCRIPT_AUTO_SENTIMENT_CTA_IN_PROGRESS')
          : t('__VIDEO_TRANSCRIPT_AUTO_SENTIMENT_CTA')}
      </Button>
    </Tooltip>
  );
};
