import { AccordionNew, MD } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { useGetCampaignsByCidSuggestionsQuery } from 'src/features/api';
import { EmptyState } from './components/EmptyState';
import { CompletionTooltip } from './components/CompletionTooltip';
import { EmptyGroup } from './components/EmptyGroup';
import { LoadingState } from './components/LoadingState';
import { useBugsByUseCase } from './hooks/useBugsByUseCase';
import BugsByUseCaseAccordion from './components/SingleGroupAccordion';
import { Reccomendation } from './components/Reccomendation';

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

export const BugsByUsecase = ({
  campaignId,
  isDefaultView,
}: {
  campaignId: number;
  isDefaultView: boolean;
}) => {
  const { t } = useTranslation();
  const { data, isError, isFetching, isLoading } = useBugsByUseCase(campaignId);
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId.toString(),
  });
  const { bugsByUseCases } = data;

  const emptyUseCases = useMemo(
    () => bugsByUseCases.filter((item) => item.bugs.length === 0),
    [bugsByUseCases]
  );
  const useCases = useMemo(
    () => bugsByUseCases.filter((item) => item.bugs.length > 0),
    [bugsByUseCases]
  );

  if (isLoading || isError) {
    return <LoadingState />;
  }

  if (!useCases.length) {
    return <EmptyState />;
  }

  return (
    <Wrapper isFetching={isFetching}>
      <AccordionNew
        level={3}
        defaultExpandedSections={Array.from(bugsByUseCases, (_, i) => i)}
        isExpandable
        isBare
      >
        {useCases.map((item, i) => (
          <>
            <BugsByUseCaseAccordion
              campaignId={campaignId}
              key={item.useCase.id}
              title={
                item.useCase?.id === -1
                  ? t('__BUGS_PAGE_NO_USECASE', 'Not a specific use case')
                  : `${item.useCase.title.full} (${item.bugs.length})`
              }
              item={item}
              footer={
                item.useCase?.id !== -1 && (
                  <CompletionTooltip percentage={item.useCase.completion} />
                )
              }
            />
            {i === 0 && suggestions && (
              <Reccomendation
                key="suggestion"
                suggestion={suggestions.suggestion}
              />
            )}
          </>
        ))}
        {isDefaultView ? (
          <EmptyGroup isBold>
            {t(
              '__BUGS_PAGE_WARNING_POSSIBLE_EMPTY_CASES',
              "As of now we couldn't find any more bugs in other use cases"
            )}
          </EmptyGroup>
        ) : (
          <>
            {emptyUseCases.length > 1 && (
              <EmptyGroup isBold>
                {t('__BUGS_PAGE_OTHER_USE_CASES', 'other use cases')}{' '}
                <MD tag="span">(0)</MD>
              </EmptyGroup>
            )}
            {emptyUseCases.length === 1 && (
              <EmptyGroup isBold>
                {emptyUseCases[0].useCase.title.full} <MD tag="span">(0)</MD>
              </EmptyGroup>
            )}
          </>
        )}
      </AccordionNew>
    </Wrapper>
  );
};
