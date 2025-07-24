import {
  Col,
  Grid,
  Row,
  Header as UgHeader,
} from '@appquality/unguess-design-system';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { BrandLogo } from 'src/common/components/navigation/header/brandLogo';

import { Content } from './Content';
import { LoadingSkeleton } from './LoadingSkeleton';

const BugContainer = styled.div<{ isFetching?: boolean }>`
  ${(p) =>
    p.isFetching &&
    `
  opacity: 0.5;
  pointer-events: none;
`}
`;

const PublicBugPage = () => {
  const { campaignId, bugId } = useParams();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();

  if (
    !campaignId ||
    Number.isNaN(Number(campaignId)) ||
    !bugId ||
    Number.isNaN(Number(bugId))
  ) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery(
    {
      cid: campaignId,
      bid: bugId,
    },
    { pollingInterval: 1200000 }
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || typeof bug === 'undefined') {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
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
      <LayoutWrapper isNotBoxed>
        <BugContainer isFetching={isFetching}>
          <Grid gutters="xxl">
            <Row style={{ marginRight: 0 }}>
              <Col lg={12} style={{ marginBottom: 0 }}>
                <Content isPublicShared bug={bug} campaignId={campaignId} />
              </Col>
            </Row>
          </Grid>
        </BugContainer>
      </LayoutWrapper>
    </>
  );
};

export default PublicBugPage;
