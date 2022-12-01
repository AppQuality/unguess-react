import { Skeleton, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BugCard } from '../../BugCard';
import { useBugsByDuplicates } from './useBugsByDuplicates';

const BugsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;
const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

const DuplicateBugs = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { bugs, isLoading, isFetching, isError } =
    useBugsByDuplicates(campaignId);

  return (
    <>
      <SM>{t('__CAMPAIGN_WIDGET_INCOMING_BUGS_MOST_SUBMITTED_DESCRIPTION')}</SM>
      <BugsWrapper>
        {isLoading || isFetching || isError ? (
          <>
            <StyledSkeleton height="120px" style={{ borderRadius: 0 }} />
            <StyledSkeleton height="120px" style={{ borderRadius: 0 }} />
            <StyledSkeleton height="120px" style={{ borderRadius: 0 }} />
            <StyledSkeleton height="120px" style={{ borderRadius: 0 }} />
          </>
        ) : (
          <>
            {bugs.map((bug) => (
              <StyledBugCard
                key={bug.id}
                severity={bug.severity.name.toLocaleLowerCase() as Severities}
              >
                {(severity) => (
                  <>
                    <BugCard.TopTitle>ID {bug.id}</BugCard.TopTitle>
                    <BugCard.Title url={bug.url}>
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
                      <BugCard.Pill severity={severity}>
                        {severity}
                      </BugCard.Pill>
                    </BugCard.Footer>
                  </>
                )}
              </StyledBugCard>
            ))}
          </>
        )}
      </BugsWrapper>
    </>
  );
};

export { DuplicateBugs };
