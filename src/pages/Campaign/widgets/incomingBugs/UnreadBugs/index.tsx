import { Accordion, SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { useTranslation } from 'react-i18next';

import { useUnreadBugs } from './useUnreadBugs';

import { EmptyState } from './EmptyState';
import { BugCard } from '../../BugCard';

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

const UnreadBugs = () => {
  const { t } = useTranslation();
  const campaignId = 4000;
  const { data, isLoading, isError } = useUnreadBugs(campaignId);

  if (isLoading) return <>Loading...</>;

  if (isError) return <EmptyState />;

  return (
    <div style={{ height: '84%', overflowY: 'scroll' }}>
      <StyledSM>{t('__CAMPAIGN_UNREAD_BUGS_DESCRIPTION')}</StyledSM>
      <Accordion isCompact isExpandable isAnimated={false} level={1}>
        {data.map((usecase) => (
          <Accordion.Section>
            <Accordion.Header>
              <StyledAccordionLabel>
                <UseCaseLabel>
                  <SM isBold>{usecase.title}</SM>
                  <SM>{`(Non letti:${usecase.unreadCount}/${usecase.totalCount})`}</SM>
                </UseCaseLabel>
              </StyledAccordionLabel>
            </Accordion.Header>
            <Accordion.Panel>
              {usecase.bugs.map((bug) => (
                <StyledBugCard severity={bug.severity}>
                  {(severity) => (
                    <>
                      <BugCard.TopTitle>{bug.internal_id}</BugCard.TopTitle>
                      <BugCard.Title
                        url={`${getLocalizedFunctionalDashboardUrl(
                          campaignId,
                          i18n.language
                        )}&bug_id=${bug.id}`}
                      >
                        {bug.title.compact}
                      </BugCard.Title>
                      <BugCard.Footer>
                        {bug.title.context &&
                          bug.title.context.map((context) => (
                            <BugCard.Pill>{context}</BugCard.Pill>
                          ))}
                        <BugCard.Separator />
                        <BugCard.Pill>{bug.type.name}</BugCard.Pill>
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
    </div>
  );
};

export { UnreadBugs };
