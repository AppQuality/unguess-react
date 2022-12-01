import { Accordion, SM, LG } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Empty } from './assets/empty.svg';

import { BugCard } from '../BugCard';

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledLG = styled(LG)`
  color: ${({ theme }) => theme.colors.primaryHue};
`;
const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <EmptyContainer>
      <Empty style={{ width: 'auto', height: '260px' }} />
      <StyledLG isBold>{t('__CAMPAIGN_UNREAD_NO_BUGS')}</StyledLG>
    </EmptyContainer>
  );
};

const UnreadBugs = () => {
  const { t } = useTranslation();
  const campaignId = 4000;
  const {
    data: unreadBugs,
    isLoading: unreadBugsIsLoading,
    isFetching: unreadBugsIsFetching,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId,
    filterBy: {
      unread: true,
    },
  });
  const {
    data: totalBugs,
    isLoading: totalBugsIsLoading,
    isFetching: totalBugsIsFetching,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId,
  });

  if (
    unreadBugsIsLoading ||
    totalBugsIsLoading ||
    totalBugsIsFetching ||
    unreadBugsIsFetching
  )
    return <>Loading...</>;

  if (!unreadBugs || !unreadBugs.items || unreadBugs.items.length === 0)
    return <EmptyState />;

  const useCases: { [key: number]: string } = {};

  const items = {
    unreadBugs: unreadBugs.items,
    totalBugs: totalBugs && totalBugs.items ? totalBugs.items : [],
  };
  unreadBugs.items.forEach((bug) => {
    if (
      bug.application_section.id &&
      bug.application_section.title &&
      !useCases[bug.application_section.id]
    ) {
      useCases[bug.application_section.id] = bug.application_section.title;
    }
  });

  const enhancedUsecase = Object.keys(useCases).map((key) => {
    let unreadCount = 0;
    items.unreadBugs.forEach((bug) => {
      if (bug.application_section.id === Number(key)) {
        unreadCount += 1;
      }
    });
    let totalCount = 0;
    items.totalBugs.forEach((bug) => {
      if (bug.application_section.id === Number(key)) {
        totalCount += 1;
      }
    });
    return {
      title: useCases[Number(key)],
      unreadCount,
      totalCount,
      bugs: items.unreadBugs,
    };
  });

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

  return (
    <div style={{ height: '84%', overflowY: 'scroll' }}>
      <StyledSM>{t('__CAMPAIGN_UNREAD_BUGS_DESCRIPTION')}</StyledSM>
      <Accordion isCompact isExpandable isAnimated={false} level={1}>
        {enhancedUsecase.map((usecase) => (
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
                <StyledBugCard
                  severity={bug.severity.name.toLowerCase() as Severities}
                >
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
