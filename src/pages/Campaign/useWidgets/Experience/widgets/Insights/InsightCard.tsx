import { SpecialCard } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { getClusterTag, getSeverityIcon, getSeverityTag } from './utils';

export const CardFooter = styled(SpecialCard.Footer)`
  flex-wrap: wrap;
  margin-bottom: -${({ theme }) => theme.space.xs};

  > * {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

const StyledSpecialCard = styled(SpecialCard)`
  pointer-events: none;
`;

const InsightCard = ({
  insight,
}: {
  insight: NonNullable<GetCampaignsByCidUxApiResponse['findings']>[number];
}) => {
  const { t } = useTranslation();

  return (
    <StyledSpecialCard title={insight.title}>
      <SpecialCard.Thumb>{getSeverityIcon(insight.severity)}</SpecialCard.Thumb>
      <SpecialCard.Header>
        <SpecialCard.Header.Label>
          {insight.severity.name}
        </SpecialCard.Header.Label>
        <SpecialCard.Header.Title style={{ marginBottom: appTheme.space.xs }}>
          {insight.title}
        </SpecialCard.Header.Title>
        <div style={{ whiteSpace: 'pre-wrap' }}>{insight.description}</div>
      </SpecialCard.Header>
      <CardFooter justifyContent="start">
        {getClusterTag(insight.cluster, t)}
        {getSeverityTag(insight.severity)}
      </CardFooter>
    </StyledSpecialCard>
  );
};

export { InsightCard };
