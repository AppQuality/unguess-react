import { PageLoader, Grid, Row, Col } from '@appquality/unguess-design-system';
import { extractStrapiData } from 'src/common/getStrapiData';
import { ManualResponse } from 'src/features/backoffice';
import { useGeti18nManualsQuery } from 'src/features/backoffice/strapi';
import i18n from 'src/i18n';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useParams } from 'react-router-dom';
import { RightModalHelp } from './components/RightModalHelp';
import { ManualDetails } from './components/ManualDetails';
import ManualHeader from './components/ManualHeader';
import ManualNotFound from './components/ManualNotFound';
import StyledCard from './components/StyledCard';

const HelpCol = styled(Col)`
  height: 100%;
  position: sticky;
  top: 64px;
`;

const Manual = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { data, isLoading, isError } = useGeti18nManualsQuery({
    locale: i18n.language,
    populate: {
      help_links: { populate: '*' },
    },
    filters: {
      campaignId: {
        $eq: campaignId,
      },
    },
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    return <ManualNotFound />;
  }

  let manual:
    | (NonNullable<ManualResponse['data']>['attributes'] & { id: number })
    | undefined;
  if (data) {
    // eslint-disable-next-line prefer-destructuring
    manual = extractStrapiData(data)[0];
  }

  return (
    <div style={{ background: appTheme.palette.grey[100], maxWidth: '100%' }}>
      <ManualHeader manual={manual} />
      <LayoutWrapper style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Grid style={{ height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <Col xs={12} lg={8}>
              <StyledCard>
                {manual ? (
                  <ManualDetails manual={manual} />
                ) : (
                  <ManualNotFound />
                )}
              </StyledCard>
            </Col>
            <HelpCol xs={12} lg={4}>
              <RightModalHelp campaignId={campaignId ?? '-1'} />
            </HelpCol>
          </Row>
        </Grid>
      </LayoutWrapper>
    </div>
  );
};

export default Manual;
