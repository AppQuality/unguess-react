import { useTranslation } from 'react-i18next';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { appTheme } from 'src/app/theme';
import { BugCard } from 'src/common/components/BugCard';
import styled from 'styled-components';
import { Insight } from './useCampaignInsights';
import { getClusterTag, getSeverity, getSeverityTag } from './utils';

const StyledBugCard = styled(BugCard)``;

const StyledStickyNavItem = styled(StickyNavItem)`
  padding: 0;

  &:hover {
    background-color: transparent;
  }

  &.isCurrent {
    background-color: transparent;

    ${StyledBugCard} {
      background-color: ${({ theme }) => theme.palette.grey[200]};
    }
  }
`;

const Navigation = ({ insights }: { insights: Insight[] }) => {
  const { t } = useTranslation();

  return (
    <StickyContainer>
      <StickyNavItemLabel>
        {t('__CAMPAIGN_PAGE_INSIGHTS_NAVIGATION_TITLE')}
      </StickyNavItemLabel>
      <StyledDivider />
      {insights.length > 0 &&
        insights.map((insight, index) => (
          <StyledStickyNavItem
            id={`anchor-insight-row-${insight.id}`}
            to={`insight-row-${insight.id}`}
            containerId="main"
            spy
            smooth
            duration={500}
            offset={-30}
          >
            <StyledBugCard
              severity={getSeverity(insight.severity) as Severities}
              url="#"
              style={{
                marginBottom: appTheme.space.sm,
              }}
            >
              {() => (
                <>
                  <BugCard.TopTitle>
                    {t('__CAMPAIGN_PAGE_INSIGHTS_NUMBER_LABEL')} {index + 1}
                  </BugCard.TopTitle>
                  <BugCard.Title>{insight.title}</BugCard.Title>
                  <BugCard.Footer>
                    {getClusterTag(insight.cluster, t)}
                    {getSeverityTag(insight.severity)}
                  </BugCard.Footer>
                </>
              )}
            </StyledBugCard>
          </StyledStickyNavItem>
        ))}
    </StickyContainer>
  );
};

export { Navigation };
