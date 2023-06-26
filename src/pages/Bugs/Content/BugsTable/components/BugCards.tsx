import { Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { BugCard } from 'src/common/components/BugCard';
import { Meta } from 'src/common/components/Meta';
import { appTheme } from 'src/app/theme';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { Bug } from 'src/features/api';
import { getLocalizedBugUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
`;

interface BugCardsProps {
  bugs: (Bug & {
    siblings: number;
    tags?:
      | {
          tag_id: number;
          tag_name: string;
        }[]
      | undefined;
  })[];
}

const BugCards = ({ bugs }: BugCardsProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      {bugs.map((bug) => (
        <StyledBugCard
          key={bug.id}
          severity={bug.severity.name.toLocaleLowerCase() as Severities}
          url={getLocalizedBugUrl(bug.campaign_id, bug.id, i18n.language)}
        >
          {(severity) => (
            <>
              <BugCard.TopTitle>ID {bug.id}</BugCard.TopTitle>
              <BugCard.Title>{bug.title.compact}</BugCard.Title>
              <BugCard.Footer>
                {bug.title.context &&
                  bug.title.context.length > 0 &&
                  bug.title.context.map((context: string) => (
                    <Tag key={`${bug.id}_${context}`}>{context}</Tag>
                  ))}
                <Tag>
                  {t('__BUGS_PAGE_BUG_CARD_DUPLICATES_LABEL')}: {bug.siblings}
                </Tag>
                <Tag>{bug.type.name}</Tag>
                {severity && <SeverityTag hasBackground severity={severity} />}
                {!bug.read && (
                  <Meta color={appTheme.palette.blue[600]}>
                    {t('__PAGE_BUGS_UNREAD_PILL', 'Unread')}
                  </Meta>
                )}
              </BugCard.Footer>
            </>
          )}
        </StyledBugCard>
      ))}
    </Container>
  );
};

export default BugCards;
