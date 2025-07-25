import {
  Col,
  Grid,
  Header as UgHeader,
  Row,
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
import { Content } from './Content';
import { LoadingSkeletonContent } from './LoadingSkeletonContent';

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
    <>
      <UgHeader
        isStandalone
        style={{
          zIndex: appTheme.levels.front,
          justifyContent: 'flex-start',
        }}
      >
        <BrandLogo redirect="/join" size="full" />
      </UgHeader>
      <LayoutWrapper isNotBoxed={false}>
        <BugContainer isFetching={isFetching}>
          <Grid gutters="xxl">
            <Row style={{ marginRight: 0 }}>
              <Col lg={12} style={{ marginBottom: 0 }}>
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
    </>
  );
};

export default PublicBugPage;
