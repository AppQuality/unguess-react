import { useTranslation } from 'react-i18next';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation/asideNav';
import { appTheme } from 'src/app/theme';
import { BugCard } from 'src/common/components/BugCard';
import styled from 'styled-components';
import { ContainerCard, Ellipsis } from '@appquality/unguess-design-system';
import { useEffect, useRef, useState } from 'react';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';
import { getClusterTag, getSeverity, getSeverityTag } from './utils';

const StickyContainer = styled(ContainerCard)`
  position: sticky;
  top: ${({ theme }) => theme.space.base * 18}px;
  z-index: 2;
  padding: ${({ theme }) => theme.space.sm}
    ${({ theme }) => theme.space.base * 4}px;
  background-color: ${({ theme }) => theme.palette.white};
`;

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

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

const StyledStickyNavItemLabel = styled(StickyNavItemLabel)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const navigationOffset = 200;

const Navigation = ({
  insights,
}: {
  insights: GetCampaignsByCidUxApiResponse['findings'];
}) => {
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
        });
      }
    }
  }, [activeInsight]);

  return (
    <StickyContainer>
      <StyledStickyNavItemLabel>
        {t('__CAMPAIGN_PAGE_INSIGHTS_NAVIGATION_TITLE')}
      </StyledStickyNavItemLabel>
      <StyledDivider />
      <ScrollingContainer ref={refScroll}>
        {insights &&
          insights.length > 0 &&
          insights.map((insight, index) => (
            <StyledStickyNavItem
              id={`anchor-insight-row-${insight.id}`}
              to={`insight-row-${insight.id}`}
              containerId="main"
              spy
              smooth
              duration={500}
              offset={-navigationOffset - 20}
              onSetActive={() => {
                setActiveInsight(`anchor-insight-row-${insight.id}`);
              }}
            >
              <StyledBugCard
                severity={getSeverity(insight.severity) as Severities}
                url="#"
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
