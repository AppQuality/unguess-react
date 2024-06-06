import { useEffect, useState } from 'react';
import {
  Button,
  MD,
  Paragraph,
  Skeleton,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import {
  CampaignWithOutput,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';
import { getAllSeverityTags } from './utils/getSeverityTagsWithCount';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const VideosMeta = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.blue[600]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-right: ${({ theme }) => theme.space.sm};
`;

const StyledPipe = styled(Pipe)`
  display: inline;
  margin-left: ${({ theme }) => theme.space.sm};
`;

const SeveritiesMetaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SeveritiesMetaText = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-right: ${({ theme }) => theme.space.sm};
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: row;
    align-items: center;

    ${ButtonWrapper} {
      margin-top: inherit;
      margin-bottom: inherit;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${ButtonWrapper} {
      margin-top: ${({ theme }) => theme.space.md};
    }
  }
`;

export const Metas = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const { status } = campaign;
  const { campaignId } = useParams();
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const { t } = useTranslation();
  const { addToast } = useToast();

  const {
    data: videos,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidVideosQuery({ cid: campaign.id.toString() });

  useEffect(() => {
    if (videos && videos.items.length > 0) {
      const groupedVideos = videos?.items.reduce(
        (total, item) => total + item.videos.length,
        0
      );
      setTotalVideos(groupedVideos);
    }
  }, [videos]);

  const severities = videos ? getAllSeverityTags(videos.items) : [];

  const handleUseCaseExport = () => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        id: campaignId,
        action: 'ug_generate_research_report',
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          window.location.href = `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/themes/unguess/report/temp/${res.data.file}`;
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="success"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_SUCCESS_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        } else {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
          // eslint-disable-next-line no-console
          console.error(res);
        }
      })
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        // eslint-disable-next-line no-console
        console.error(e.message);
      });
  };

  if (isFetching || isLoading) return <Skeleton width="200px" height="20px" />;
  if (isError) return null;

  return (
    <FooterContainer>
      <PageMeta>
        <VideosMeta>
          {totalVideos}{' '}
          {t('__VIDEOS_LIST_META_VIDEO_COUNT', { count: totalVideos })}
        </VideosMeta>
        {severities && severities.length > 0 && (
          <>
            <SeveritiesMetaContainer>
              <SeveritiesMetaText>
                {t('__VIDEO_LIST_META_SEVERITIES_COUNT')}
              </SeveritiesMetaText>
              {severities.map((severity) => (
                <Meta
                  size="large"
                  color={severity.style}
                  secondaryText={severity.count}
                >
                  {capitalizeFirstLetter(severity.name)}
                </Meta>
              ))}
            </SeveritiesMetaContainer>
            <StyledPipe />
          </>
        )}
        <StatusMeta status={status.name as CampaignStatus} />
      </PageMeta>
      <ButtonWrapper>
        <CampaignSettings />
        {totalVideos > 0 && (
          <Button isAccent isPrimary size="small" onClick={handleUseCaseExport}>
            <Button.StartIcon>
              <DownloadIcon />
            </Button.StartIcon>
            {t('__VIDEO_PAGE_ACTIONS_EXPORT_BUTTON_LABEL')}
          </Button>
        )}
      </ButtonWrapper>
    </FooterContainer>
  );
};
