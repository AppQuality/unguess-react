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
} from 'src/features/api';

import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

import { useEffect } from 'react';
import { Content } from '../Bug/Content';
import { LoadingSkeletonContent } from '../Bug/LoadingSkeletonContent';

const CampaignTitleContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xxl};
  margin-top: ${({ theme }) => theme.space.xxl};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.xxl};
  }
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
    <div style={{ backgroundColor: appTheme.palette.grey[100] }}>
      <UgHeader
        isStandalone
        style={{
          zIndex: appTheme.levels.front,
          justifyContent: 'flex-start',
        }}
      >
        <BrandLogo redirect="/join" size="full" />
      </UgHeader>
      <CampaignTitleContainer>
        <Tag isPill={false} isRegular hue="rgba(0,0,0,0)">
          Activity ID: {campaignId} -
          <Tag.SecondaryText isBold>{campaignTitle}</Tag.SecondaryText>
        </Tag>
      </CampaignTitleContainer>
      <LayoutWrapper>
        <BugContainer isFetching={isFetching}>
          <Grid gutters="xxl">
            <Row style={{ marginRight: 0 }}>
              <Col lg={8} style={{ marginBottom: 0 }}>
                <Content
                  isPublicShared
                  bug={bug}
                  campaignId={String(campaignId)}
                />
              </Col>
            </Row>
          </Grid>
        </BugContainer>
      </LayoutWrapper>
    </div>
  );
};

export default PublicBugPage;
