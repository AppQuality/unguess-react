import { SpecialCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Insight } from './useCampaignInsights';
import { getClusterTag, getSeverityIcon, getSeverityTag } from './utils';

export const CardFooter = styled(SpecialCard.Footer)`
  flex-wrap: wrap;
  margin-bottom: -${({ theme }) => theme.space.xs};

  > * {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

const InsightCard = ({ insight }: { insight: Insight }) => {
  const { t } = useTranslation();

  return (
    <SpecialCard title={insight.title}>
      <SpecialCard.Thumb>{getSeverityIcon(insight.severity)}</SpecialCard.Thumb>
      <SpecialCard.Header>
        <SpecialCard.Header.Label>
          {insight.severity.name}
        </SpecialCard.Header.Label>
        <SpecialCard.Header.Title style={{ marginBottom: appTheme.space.xs }}>
          {insight.title}
        </SpecialCard.Header.Title>
        {insight.description}
      </SpecialCard.Header>
      <CardFooter justifyContent="start">
        {getClusterTag(insight.cluster, t)}
        {getSeverityTag(insight.severity)}
      </CardFooter>
    </SpecialCard>
  );
};

export { InsightCard };
