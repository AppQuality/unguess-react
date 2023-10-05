import { SpecialCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as VideoPlayIcon } from 'src/assets/icons/video-play-icon.svg';
import { Trans, useTranslation } from 'react-i18next';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';
import { CardFooter } from './InsightCard';
import { getClusterTag, getSeverityTag } from './utils';

const CardThumb = styled(SpecialCard.Thumb)`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .img-container {
    width: 100%;
    height: 200px;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    overflow: hidden;
    position: relative;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.palette.grey[600]};
    margin-bottom: ${({ theme }) => theme.space.sm};

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
      overflow: hidden;
    }
    > img {
      width: auto;
      max-height: 100%;
    }
    > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
      width: ${({ theme }) => theme.space.base * 14}px;
      height: auto;
      z-index: 3;
    }
  }
`;

const Player = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > video {
    width: 100%;
    height: 200px;
  }
`;

const HighlightCard = ({
  video,
  videoCount,
  index,
  insight,
  poster,
  onClick,
}: {
  video: NonNullable<
    NonNullable<GetCampaignsByCidUxApiResponse['findings']>[number]['video']
  >[number];
  videoCount: number;
  index: number;
  insight: NonNullable<GetCampaignsByCidUxApiResponse['findings']>[number];
  poster?: string;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <SpecialCard title={video.description} onClick={onClick}>
      <SpecialCard.Header>
        <CardThumb>
          <div className="img-container">
            <VideoPlayIcon />
            {poster && poster !== '' ? (
              <img src={poster} alt={video.description} />
            ) : (
              <Player>
                <video src={`${video.url}#t=0.5`}>
                  <track kind="captions" />
                </video>
              </Player>
            )}
          </div>
        </CardThumb>
        <SpecialCard.Header.Label>
          <Trans i18nKey="__CAMPAIGN_PAGE_INSIGHTS_VIDEO_PART_NUMBER_LABEL">
            Highlight {{ index: index + 1 }} of {{ video_count: videoCount }}
          </Trans>
        </SpecialCard.Header.Label>
        <SpecialCard.Header.Title
          style={{
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {`”${video.description}”`}
        </SpecialCard.Header.Title>
      </SpecialCard.Header>
      <CardFooter justifyContent="start">
        {getSeverityTag(insight.severity, insight.title)}
        {getClusterTag(insight.cluster, t)}
      </CardFooter>
    </SpecialCard>
  );
};

export { HighlightCard };
