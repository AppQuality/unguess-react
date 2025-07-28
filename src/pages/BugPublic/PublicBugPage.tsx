import {
  Col,
  Grid,
  Header as UgHeader,
  Row,
  Tag,
} from '@appquality/unguess-design-system';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { BrandLogo } from 'src/common/components/navigation/header/brandLogo';
import {
  useGetCampaignsByCidBugsAndBidQuery,
  useGetPublicBugsByDefectIdTokensAndTokenQuery,
  useGetUsersMeQuery,
} from 'src/features/api';

import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

import { useEffect } from 'react';
import { Content } from '../Bug/Content';
import { LoadingSkeletonContent } from '../Bug/LoadingSkeletonContent';

const CampaignTitleContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space.xxl} 0 0 0;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const BugContainer = styled.div<{ isFetching?: boolean }>`
  ${(p) =>
    p.isFetching &&
    `
  opacity: 0.5;
  pointer-events: none;
`}
`;

const PublicBugPage = () => {
  const { defectId, token } = useParams();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  let redirectUrl;

  const { data: user } = useGetUsersMeQuery();
  const location = useLocation();

  if (!defectId || Number.isNaN(Number(defectId)) || !token) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  const {
    data: bugIdAndCampaign,
    error: bugIdAndCampaignError,
    isError: isErrorBugIdAndCampaign,
    isLoading: isLoadingBugIdAndCampaign,
  } = useGetPublicBugsByDefectIdTokensAndTokenQuery({
    defectId: Number(defectId),
    token,
  });

  const bugId = bugIdAndCampaign?.bugId;
  const campaignTitle = bugIdAndCampaign?.campaignTitle;
  const campaignId = bugIdAndCampaign?.campaignId;

  useEffect(() => {
    if (isErrorBugIdAndCampaign) {
      navigate(notFoundRoute, {
        state: { from: location.pathname },
      });
    }
  }, [isErrorBugIdAndCampaign]);

  const {
    data: bug,
    isLoading: isLoadingBug,
    isFetching,
    isError: isErrorBug,
  } = useGetCampaignsByCidBugsAndBidQuery(
    {
      cid: campaignId?.toString() ?? '',
      bid: bugId?.toString() ?? '',
      publicBugToken: `${defectId}:${token}`,
    },
    {
      skip: !bugId || !campaignId,
    }
  );

  useEffect(() => {
    if (typeof user === 'undefined') {
      redirectUrl = '/join';
    } else {
      redirectUrl = '/';
    }
  }, [user]);

  if (
    isLoadingBugIdAndCampaign ||
    !bugIdAndCampaign ||
    !bugId ||
    !campaignId ||
    !campaignTitle ||
    isLoadingBug
  ) {
    return <LoadingSkeletonContent />;
  }

  if (bugIdAndCampaignError || isErrorBug) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  if (typeof bug === 'undefined') {
    return <LoadingSkeletonContent />;
  }

  return (
    <div
      style={{
        backgroundColor: appTheme.palette.grey[100],
      }}
    >
      <UgHeader
        isStandalone
        data-qa="public-bug-page-header"
        style={{
          zIndex: appTheme.levels.front,
          justifyContent: 'flex-start',
          paddingLeft: appTheme.space.md,
        }}
      >
        <BrandLogo redirect={redirectUrl} size="full" />
      </UgHeader>
      <LayoutWrapper>
        <Grid gutters="xxl">
          <Row style={{ marginRight: 0, justifyContent: 'center' }}>
            <Col lg={8} style={{ marginBottom: 0 }}>
              <CampaignTitleContainer data-qa="public-bug-campaign-info">
                <Tag isPill={false} isRegular hue="rgba(0,0,0,0)">
                  Activity ID: {campaignId} -
                  <Tag.SecondaryText isBold>{campaignTitle}</Tag.SecondaryText>
                </Tag>
              </CampaignTitleContainer>
              <BugContainer
                isFetching={isFetching}
                data-qa="public-bug-container-card"
              >
                <Content
                  isPublicShared
                  bug={bug}
                  campaignId={String(campaignId)}
                />
              </BugContainer>
            </Col>
          </Row>
        </Grid>
      </LayoutWrapper>
    </div>
  );
};

export default PublicBugPage;
