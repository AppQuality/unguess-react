import {
  Accordion,
  Skeleton,
  SM,
  Span,
  Tag,
  TextLabel,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BugCard } from 'src/common/components/BugCard';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import styled from 'styled-components';
import { EmptyState } from './EmptyState';
import { useUnreadBugs } from './useUnreadBugs';

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
const StyledBugCard: typeof BugCard = styled(BugCard)`
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
      <div style={{ marginTop: appTheme.space.sm }}>
        <StyledSkeleton width="80%" height="28px" />
        <StyledSkeleton width="60%" height="22px" />
        <StyledSkeleton
          width="60%"
          height="22px"
          style={{ marginBottom: appTheme.space.md }}
        />

        <StyledSkeleton width="80%" height="28px" />
        <StyledSkeleton width="60%" height="22px" />
        <StyledSkeleton width="60%" height="22px" />
      </div>
    );

  if (isError) return <EmptyState />;

  return (
    <>
      <StyledSM>
        {t('__CAMPAIGN_WIDGET_INCOMING_BUGS_UNREAD_DESCRIPTION')}
      </StyledSM>
      <Accordion isCompact isExpandable isAnimated={false} level={1}>
        {data.map((usecase) => (
          <Accordion.Section className="accordion-use-case-unread-bugs-incoming-bugs-widget">
            <Accordion.Header>
              <StyledAccordionLabel>
                <UseCaseLabel>
                  <SM isBold style={{ paddingRight: appTheme.space.xs }}>
                    {usecase.title}
                  </SM>
                  <TextLabel>
                    <Span>({t('__CAMPAIGN_WIDGET_INCOMING_BUGS_UNREAD')}</Span>
                    {': '}
                    <Span isBold style={{ color: appTheme.palette.blue[600] }}>
                      {usecase.unreadCount}
                    </Span>
                    /{usecase.totalCount})
                  </TextLabel>
                </UseCaseLabel>
              </StyledAccordionLabel>
            </Accordion.Header>
            <Accordion.Panel>
              {usecase.bugs.map((bug) => (
                <StyledBugCard severity={bug.severity} url={bug.url}>
                  {(severity) => (
                    <>
                      <BugCard.TopTitle>ID {bug.id}</BugCard.TopTitle>
                      <BugCard.Title>{bug.title}</BugCard.Title>
                      <BugCard.Footer>
                        {bug.titleContext &&
                          bug.titleContext.map((context) => (
                            <Tag>{context}</Tag>
                          ))}
                        <Tag>{bug.type}</Tag>
                        {severity && (
                          <SeverityTag hasBackground severity={severity} />
                        )}
                      </BugCard.Footer>
                    </>
                  )}
                </StyledBugCard>
              ))}
            </Accordion.Panel>
          </Accordion.Section>
        ))}
      </Accordion>
    </>
  );
};

export { UnreadBugs };
