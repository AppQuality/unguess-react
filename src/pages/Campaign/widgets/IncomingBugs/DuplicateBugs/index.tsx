import { Skeleton, SM, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import styled from 'styled-components';
import { BugCard } from 'src/common/components/BugCard';
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
                url={bug.url}
              >
                {(severity) => (
                  <>
                    <BugCard.TopTitle>ID {bug.id}</BugCard.TopTitle>
                    <BugCard.Title>{bug.title.compact}</BugCard.Title>
                    <BugCard.Description>
                      {bug.application_section.title}
                    </BugCard.Description>
                    <BugCard.Footer>
                      {bug.title.context &&
                        bug.title.context.length > 0 &&
                        bug.title.context.map((context) => (
                          <Tag key={`${bug.id}_${context}`}>{context}</Tag>
                        ))}
                      <Tag>
                        {t(
                          '__CAMPAIGN_WIDGET_INCOMING_BUGS_MOST_SUBMITTED_DUPLICATES_LABEL'
                        )}
                        : {bug.duplicates}
                      </Tag>
                      <Tag>{bug.type.name}</Tag>
                      {severity && (
                        <SeverityTag hasBackground severity={severity} />
                      )}
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
