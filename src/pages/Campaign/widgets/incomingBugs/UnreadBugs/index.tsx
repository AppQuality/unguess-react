import {
  Accordion,
  Skeleton,
  SM,
  theme as ugTheme,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useUnreadBugs } from './useUnreadBugs';
import { EmptyState } from './EmptyState';
import { BugCard } from '../../BugCard';
import { UnreadBugsWrapper } from './UnreadBugsWrapper';

const StyledAccordionLabel = styled(Accordion.Label)`
  padding-right: 0;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const UseCaseLabel = styled.div`
  display: grid;
  grid-template-columns: 1fr fit-content(100%);
  align-items: center;
`;
const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;
const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

const UnreadBugs = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useUnreadBugs(campaignId);

  if (isLoading)
    return (
      <>
        <StyledSkeleton height="110px" style={{ borderRadius: 0 }} />
        <StyledSkeleton height="110px" style={{ borderRadius: 0 }} />
        <StyledSkeleton height="110px" style={{ borderRadius: 0 }} />
      </>
    );

  if (isError) return <EmptyState />;

  return (
    <UnreadBugsWrapper>
      <StyledSM>
        {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_UNREAD_DESCRIPTION')}
      </StyledSM>
      <Accordion isCompact isExpandable isAnimated={false} level={1}>
        {data.map((usecase) => (
          <Accordion.Section>
            <Accordion.Header>
              <StyledAccordionLabel>
                <UseCaseLabel>
                  <SM isBold>{usecase.title}</SM>
                  <SM style={{ color: ugTheme.palette.grey[600] }}>
                    <span style={{ color: ugTheme.palette.blue[600] }}>
                      {usecase.unreadCount}
                    </span>
                    /{usecase.totalCount}
                  </SM>
                </UseCaseLabel>
              </StyledAccordionLabel>
            </Accordion.Header>
            <Accordion.Panel>
              {usecase.bugs.map((bug) => (
                <StyledBugCard severity={bug.severity}>
                  {(severity) => (
                    <>
                      <BugCard.TopTitle>{bug.internal_id}</BugCard.TopTitle>
                      <BugCard.Title url={bug.url}>{bug.title}</BugCard.Title>
                      <BugCard.Footer>
                        {bug.titleContext &&
                          bug.titleContext.map((context) => (
                            <BugCard.Pill>{context}</BugCard.Pill>
                          ))}
                        <BugCard.Pill>{bug.type}</BugCard.Pill>
                        <BugCard.Pill severity={severity}>
                          {severity}
                        </BugCard.Pill>
                      </BugCard.Footer>
                    </>
                  )}
                </StyledBugCard>
              ))}
            </Accordion.Panel>
          </Accordion.Section>
        ))}
      </Accordion>
    </UnreadBugsWrapper>
  );
};

export { UnreadBugs };
