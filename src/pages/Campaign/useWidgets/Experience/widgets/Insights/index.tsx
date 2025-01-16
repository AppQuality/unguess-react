import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { InsightsContent } from './Content';
import { FiltersDropwdowns } from './filters/FiltersDropdowns';
import { FiltersHeader } from './filters/FiltersHeader';
import { FiltersTags } from './filters/FiltersTags';

export const Insights = ({
  id,
  campaign,
  isPreview,
}: {
  id: string;
  campaign: Campaign;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const url = window.location.href;
    const urlAnchor = url.split('#')[1];
    if (urlAnchor) {
      const anchor = document.getElementById(urlAnchor);
      const main = document.getElementById('main');
      if (anchor && main) {
        main.scroll({
          top: anchor.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return (
    <div {...(id && { id })}>
      <Grid>
        <Row>
          <Col xs={12} style={{ margin: 0 }}>
            <SectionTitle
              title={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_TITLE')}
              subtitle={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_SUBTITLE')}
            />
            <Divider style={{ margin: `${appTheme.space.md} 0` }} />
          </Col>
        </Row>
      </Grid>
      <Grid gutters="md">
        <FiltersHeader />
        <FiltersDropwdowns />
        <FiltersTags />
        <InsightsContent campaign={campaign} isPreview={isPreview} />
      </Grid>
    </div>
  );
};
