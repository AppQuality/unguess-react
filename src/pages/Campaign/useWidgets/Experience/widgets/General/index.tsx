import { Campaign } from 'src/features/api';
import {
  Anchor,
  Col,
  Grid,
  Row,
  Skeleton,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { Divider } from 'src/common/components/divider';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { GoalCard } from './GoalCard';
import { Methodology } from './Methodology';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  grid-gap: ${({ theme }) => theme.space.md};
  align-items: start;
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

  return (
    <div style={{ marginBottom: appTheme.space.xxl }} id={id}>
      <Row>
        <Col xs={12} style={{ margin: 0 }}>
          <SectionTitle
            title={t('__CAMPAIGN_PAGE_METHODOLOGY_SECTION_TITLE')}
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
    </div>
  );
};
