import {
  Anchor,
  Button,
  IconButton,
  PageHeader,
  Skeleton,
  Span,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as InsightsIcon } from '@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg';
import { ReactComponent as InfoIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-share.svg';
import {
  useGetCampaignsByCidVideosQuery,
  useGetHubsByHidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { UploadModal } from './UploadModal';

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background-color: ${({ theme }) => theme.palette.grey[300]};
  margin: 0 ${({ theme }) => theme.space.xxs};
`;

const HubVideosPageHeader = () => {
  const { hubId } = useParams();
  const { t } = useTranslation();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const hubRoute = useLocalizeRoute(`hubs/${hubId}`);

  const { data: hub, isLoading: isLoadingHub } = useGetHubsByHidQuery(
    { hid: hubId ?? '' },
    { skip: !hubId }
  );
  const { data: videos, isLoading: isLoadingVideos } =
    useGetCampaignsByCidVideosQuery({ cid: hubId ?? '' }, { skip: !hubId });

  const projectRoute = useLocalizeRoute(`projects/${hub?.project.id ?? ''}`);
  const totalVideos = videos?.items.length ?? 0;

  if (isLoadingHub) return <Skeleton height="80px" />;
  if (!hub) return null;

  return (
    <>
      <LayoutWrapper isNotBoxed>
        <PageHeader>
          <PageHeader.Breadcrumbs>
            <Link to={projectRoute}>
              <Anchor id="breadcrumb-project">{hub.project.name}</Anchor>
            </Link>
            <Link to={hubRoute}>
              <Anchor id="breadcrumb-hub">{hub.title}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>
          <PageHeader.Main mainTitle={hub.title}>
            <PageHeader.Title>{hub.title}</PageHeader.Title>
            <PageHeader.Meta>
              <FooterContainer>
                {isLoadingVideos ? (
                  <Skeleton width="80px" height="20px" />
                ) : (
                  <Span isBold style={{ color: appTheme.palette.blue[600] }}>
                    {totalVideos}{' '}
                    {t('__HUB_VIDEOS_META_MEDIA_UPLOADED', {
                      count: totalVideos,
                    })}
                  </Span>
                )}
                <ButtonWrapper>
                  <Button
                    isAccent
                    isPrimary
                    onClick={() => setIsUploadOpen(true)}
                  >
                    {t('__HUB_VIDEOS_EMPTY_STATE_BUTTON')}
                  </Button>
                  <Divider />
                  <Tooltip
                    content={t('__HUB_VIDEOS_HEADER_SHARE_BUTTON')}
                    size="medium"
                    type="light"
                  >
                    <IconButton isBasic={false}>
                      <UsersIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    content={t('__HUB_VIDEOS_HEADER_INFO_BUTTON')}
                    size="medium"
                    type="light"
                  >
                    <IconButton isBasic={false}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    content={t('__HUB_VIDEOS_HEADER_INSIGHTS_BUTTON')}
                    size="medium"
                    type="light"
                  >
                    <IconButton isBasic={false}>
                      <InsightsIcon />
                    </IconButton>
                  </Tooltip>
                </ButtonWrapper>
              </FooterContainer>
            </PageHeader.Meta>
          </PageHeader.Main>
        </PageHeader>
      </LayoutWrapper>
      {isUploadOpen && hubId && (
        <UploadModal hubId={hubId} onClose={() => setIsUploadOpen(false)} />
      )}
    </>
  );
};

export default HubVideosPageHeader;
