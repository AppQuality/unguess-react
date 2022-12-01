import { Skeleton, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { WidgetBugsByDuplicates } from 'src/features/api';
import styled from 'styled-components';
import { BugCards, BugCardWrapper } from './BugCards';

const BugsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const DuplicateBugs = ({
  data,
}: {
  data: {
    bugs: WidgetBugsByDuplicates['data'];
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
  };
}) => {
  const { t } = useTranslation();
  const { bugs, isLoading, isFetching, isError } = data;

  return (
    <>
      <SM>{t('__CAMPAIGN_WIDGET_INCOMING_BUGS_MOST_SUBMITTED_DESCRIPTION')}</SM>
      <BugsWrapper>
        {isLoading || isFetching || isError ? (
          <>
            <BugCardWrapper>
              <Skeleton height="120px" style={{ borderRadius: 0 }} />
            </BugCardWrapper>
            <BugCardWrapper>
              <Skeleton height="120px" style={{ borderRadius: 0 }} />
            </BugCardWrapper>
            <BugCardWrapper>
              <Skeleton height="120px" style={{ borderRadius: 0 }} />
            </BugCardWrapper>
            <BugCardWrapper>
              <Skeleton height="120px" style={{ borderRadius: 0 }} />
            </BugCardWrapper>
          </>
        ) : (
          <BugCards bugs={bugs} />
        )}
      </BugsWrapper>
    </>
  );
};

export { DuplicateBugs };
