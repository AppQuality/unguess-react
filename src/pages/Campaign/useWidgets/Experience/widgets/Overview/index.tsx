import { Campaign } from 'src/features/api';
import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { Divider } from 'src/common/components/divider';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { Sentiment } from './Sentiment';

export const Overview = ({
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
    <Grid style={{ marginBottom: appTheme.space.xxl }} id={id}>
      <Row>
        <Col xs={12} style={{ margin: 0 }}>
          <SectionTitle
            title={t('__CAMPAIGN_PAGE_EXP_OVERVIEW_SECTION_TITLE')}
            subtitle={t('__CAMPAIGN_PAGE_EXP_OVERVIEW_SECTION_SUBTITLE')}
          />
          <Divider style={{ margin: `${appTheme.space.md} 0` }} />
        </Col>
      </Row>
      <Row style={{ flexFlow: 'column' }}>
        <Col xs={12} style={{ margin: 0 }}>
          <Sentiment campaignId={campaign.id} isPreview={isPreview} />
        </Col>
      </Row>
    </Grid>
  );
};
