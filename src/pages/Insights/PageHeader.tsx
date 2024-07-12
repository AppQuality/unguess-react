import {
  Anchor,
  MD,
  PageHeader,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetCampaignsByCidQuery,
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Meta } from 'src/common/components/Meta';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { styled } from 'styled-components';
import { getSeverityTagsByVideoCount } from '../Videos/utils/getSeverityTagsWithCount';

const SeveritiesMetaContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const SeveritiesMetaText = styled.div`
  margin-right: ${({ theme }) => theme.space.sm};
`;
const StyledUseCaseName = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-left: auto;
`;
const StyledPageHeaderMeta = styled(PageHeader.Meta)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${StyledUseCaseName} {
      display: block;
      width: 100%;
      margin-top: ${({ theme }) => theme.space.xs};
    }
  }
`;

const VideoPageHeader = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const videosRoute = useLocalizeRoute(`campaigns/${campaignId}/videos`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);

  const {
    data: campaign,
    isFetching: isFetchingCampaign,
    isLoading: isLoadingCampaign,
    isError: isErrorCampaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId || '',
  });

  if (!campaign || isErrorCampaign) return null;

  if (isFetchingCampaign || isLoadingCampaign) return <Skeleton />;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader style={{ padding: `${appTheme.space.xs} 0` }}>
        <PageHeader.Main mainTitle={t('__INSIGHTS_PAGE_TITLE')}>
          <PageHeader.Breadcrumbs>
            <Link to={campaignRoute}>
              <Anchor id="breadcrumb-parent">{campaign.customer_title}</Anchor>
            </Link>
            <Link to={videosRoute}>
              <Anchor id="breadcrumb-parent">{t('__VIDEOS_PAGE_TITLE')}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>
          <PageHeader.Title>{t('__INSIGHTS_PAGE_TITLE')}</PageHeader.Title>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
