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
import { Ellipsis } from '@appquality/unguess-design-system';
import { useEffect, useRef, useState } from 'react';
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

const ScrollingContainer = styled.div`
  max-height: calc(80vh - ${appTheme.components.chrome.header.height});
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.space.sm};
`;

const Navigation = ({ insights }: { insights: Insight[] }) => {
  const { t } = useTranslation();
  const refScroll = useRef<HTMLDivElement>(null);
  const [activeInsight, setActiveInsight] = useState<string>();

  useEffect(() => {
    if (refScroll.current) {
      // Set ScrollingContainer position to active insight
      const activeInsightElement = document.getElementById(activeInsight || '');
      if (activeInsightElement) {
        refScroll.current.scrollTo({
          top: activeInsightElement.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    }
  }, [activeInsight]);

  return (
    <StickyContainer>
      <StickyNavItemLabel>
        {t('__CAMPAIGN_PAGE_INSIGHTS_NAVIGATION_TITLE')}
      </StickyNavItemLabel>
      <StyledDivider />
      <ScrollingContainer ref={refScroll}>
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
              onSetActive={() => {
                setActiveInsight(`anchor-insight-row-${insight.id}`);
              }}
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
                    <BugCard.Title>
                      <Ellipsis>{insight.title}</Ellipsis>
                    </BugCard.Title>
                    <BugCard.Footer>
                      {getClusterTag(insight.cluster, t)}
                      {getSeverityTag(insight.severity)}
                    </BugCard.Footer>
                  </>
                )}
              </StyledBugCard>
            </StyledStickyNavItem>
          ))}
      </ScrollingContainer>
    </StickyContainer>
  );
};

export { Navigation };
