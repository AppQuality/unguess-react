import { Accordion, MD } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { styled } from 'styled-components';
import { EmptyState } from './components/EmptyState';
import { EmptyGroup } from './components/EmptyGroup';
import { useBugsByState } from './hooks/useBugsByState';
import { LoadingState } from './components/LoadingState';
import BugStateAccordion from './components/SingleGroupAccordion';

const Wrapper = styled.div<{
  isFetching?: boolean;
}>`
  padding-top: ${(p) => p.theme.space.lg};

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

export const BugsByState = ({
  campaignId,
  isDefaultView,
}: {
  campaignId: number;
  isDefaultView: boolean;
}) => {
  const { t } = useTranslation();
  const { data, isError, isFetching, isLoading } = useBugsByState(campaignId);
  const { bugsByStates } = data;

  const emptyBugStates = useMemo(
    () => bugsByStates.filter((item) => item.bugs.length === 0),
    [bugsByStates]
  );
  const bugStates = useMemo(
    () => bugsByStates.filter((item) => item.bugs.length > 0),
    [bugsByStates]
  );

  if (isLoading || isError) {
    return <LoadingState />;
  }

  if (!bugStates.length) {
    return <EmptyState />;
  }

  return (
    <Wrapper isFetching={isFetching}>
      <Accordion
        level={3}
        defaultExpandedSections={Array.from(bugsByStates, (_, i) => i)}
        isExpandable
        isBare
      >
        {bugStates.map((item) => (
          <BugStateAccordion
            /* TODO: prop drilling (campaignId) */
            campaignId={campaignId}
            key={item.state.id}
            title={
              <>
                {t('__BUG_STATUS')}:{' '}
                {getCustomStatusInfo(item.state.name as BugState, t).text}
                <MD tag="span">{` (${item.bugs.length})`}</MD>
              </>
            }
            item={item}
          />
        ))}
        {isDefaultView ? (
          <EmptyGroup isBold>
            {t('__BUGS_PAGE_WARNING_POSSIBLE_EMPTY_STATUS')}
          </EmptyGroup>
        ) : (
          <>
            {emptyBugStates.length > 1 && (
              <EmptyGroup isBold>
                {t('__BUGS_PAGE_OTHER_STATUSES')} <MD tag="span">(0)</MD>
              </EmptyGroup>
            )}
            {emptyBugStates.length === 1 && (
              <EmptyGroup isBold>
                {emptyBugStates[0].state.name} <MD tag="span">(0)</MD>
              </EmptyGroup>
            )}
          </>
        )}
      </Accordion>
    </Wrapper>
  );
};
