import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getLocalizedBugUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { WidgetBugsByDuplicates } from 'src/features/api';
import { BugCard } from '../BugCard';

const BugCardWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

const BugCards = ({ bugs }: { bugs: WidgetBugsByDuplicates['data'] }) => {
  const { t } = useTranslation();

  return (
    <>
      {bugs.map((bug) => {
        const bugUrl = getLocalizedBugUrl(
          bug.campaign_id,
          bug.id,
          i18n.language
        );

        return (
          <BugCardWrapper>
            <BugCard
              key={bug.id}
              severity={bug.severity.name.toLocaleLowerCase() as Severities}
            >
              {(severity) => (
                <>
                  <BugCard.TopTitle>ID {bug.id}</BugCard.TopTitle>
                  <BugCard.Title url={bugUrl}>
                    {bug.title.compact}
                  </BugCard.Title>
                  <BugCard.Description>
                    {bug.application_section.title}
                  </BugCard.Description>
                  <BugCard.Footer>
                    {bug.title.context &&
                      bug.title.context.length > 0 &&
                      bug.title.context.map((context) => (
                        <BugCard.Pill>{context}</BugCard.Pill>
                      ))}
                    <BugCard.Pill>
                      {t(
                        '__CAMPAIGN_WIDGET_INCOMING_BUGS_MOST_SUBMITTED_DUPLICATES_LABEL'
                      )}
                      : {bug.duplicates}
                    </BugCard.Pill>
                    <BugCard.Separator />
                    <BugCard.Pill>{bug.type.name}</BugCard.Pill>
                    <BugCard.Pill severity={severity}>{severity}</BugCard.Pill>
                  </BugCard.Footer>
                </>
              )}
            </BugCard>
          </BugCardWrapper>
        );
      })}
    </>
  );
};

export { BugCards, BugCardWrapper };
