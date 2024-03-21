import { Campaign } from 'src/features/api';
import { Col, Grid, IconButton, Row } from '@appquality/unguess-design-system';
import { ReactComponent as LinkIcon } from 'src/pages/Campaign/useWidgets/Experience/widgets/Insights/Comments/assets/notes-stroke.svg';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { Divider } from 'src/common/components/divider';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { GoalCard } from './GoalCard';
import { Methodology } from './Methodology';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  grid-gap: ${({ theme }) => theme.space.md};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const CampaignInfo = ({
  id,
  campaign,
  isPreview,
}: {
  id: string;
  campaign: Campaign;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const uxDasboardLink = useLocalizeRoute(
    `campaigns/${campaign.id}/ux-dashboard`
  );

  return (
    <Grid style={{ marginBottom: appTheme.space.xxl }} id={id}>
      <Row>
        <Col xs={12} style={{ margin: 0 }}>
          <SectionTitle
            title={t('__CAMPAIGN_PAGE_METHODOLOGY_SECTION_TITLE')}
            children={
              isPreview ? undefined : (
                <Link to={uxDasboardLink}>
                  <IconButton size="small">
                    <LinkIcon />
                  </IconButton>
                </Link>
              )
            }
            subtitle={t('__CAMPAIGN_PAGE_METHODOLOGY_SECTION_SUBTITLE')}
          />
          <Divider style={{ margin: `${appTheme.space.md} 0` }} />
        </Col>
      </Row>
      <StyledRow style={{ flexFlow: 'column' }}>
        <div style={{ margin: 0 }}>
          <GoalCard campaignId={campaign.id} isPreview={isPreview} />
        </div>
        <div style={{ margin: 0 }}>
          <Methodology campaignId={campaign.id} isPreview={isPreview} />
        </div>
      </StyledRow>
    </Grid>
  );
};
