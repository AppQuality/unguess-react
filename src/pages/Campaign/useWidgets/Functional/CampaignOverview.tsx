import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from '../../SectionTitle';
import BugDistributionCard from './widgets/BugDistributionCard';
import { Progress } from './widgets/Progress';
import { UniqueBugs } from './widgets/UniqueBugs';
import { BookACall } from './widgets/BookACall';

const WidgetGrid = styled.div`
  margin-bottom: ${(p) => p.theme.space.xxl};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space.lg};

  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

interface WidgetSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const WidgetSection = ({
  id,
  subtitle,
  title,
  children,
}: WidgetSectionProps) => (
  <section id={id}>
    <header style={{ marginBottom: appTheme.space.xl }}>
      <SectionTitle subtitle={subtitle} title={title} />
    </header>
    <WidgetGrid>{children}</WidgetGrid>
  </section>
);

export const CampaignOverview = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  return (
    <WidgetSection
      id={id}
      title={t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OVERVIEW_LABEL')}
    >
      <Progress campaign={campaign} />
      <UniqueBugs campaignId={campaign ? campaign.id : 0} />
      <BugDistributionCard campaignId={campaign ? campaign.id : 0} />
      <BookACall />
    </WidgetSection>
  );
};
