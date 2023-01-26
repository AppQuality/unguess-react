import { Accordion, MD } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { BugByUsecaseType } from './types';
import { CompletionTooltip } from './components/CompletionTooltip';
import { EmptyGroup } from './components/EmptyGroup';

export const BugsByUsecase = ({
  bugsByUseCases,
}: {
  bugsByUseCases: BugByUsecaseType[];
}) => {
  const { t } = useTranslation();
  const emptyUseCases = useMemo(
    () => bugsByUseCases.filter((item) => item.bugs.length === 0),
    [bugsByUseCases]
  );
  const useCases = useMemo(
    () => bugsByUseCases.filter((item) => item.bugs.length > 0),
    [bugsByUseCases]
  );
  // seems that sections index are only odd numbers ¯\_(ツ)_/¯
  // i.e. [1, 3, 5, 7]
  const defaultExpandedSections = Array.from(
    bugsByUseCases,
    (_, i) => i + (i + 1)
  );

  if (!useCases.length) {
    return <EmptyState />;
  }

  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {useCases.map((item) => (
        <SingleGroupTable
          key={item.useCase.id}
          title={
            <>
              {item.useCase.title.full}
              <MD tag="span">{` (${item.bugs.length})`}</MD>
            </>
          }
          item={item}
          footer={<CompletionTooltip percentage={item.useCase.completion} />}
        />
      ))}
      {emptyUseCases.length > 1 && (
        <EmptyGroup isBold>
          {t('other use cases')} <MD tag="span">(0)</MD>
        </EmptyGroup>
      )}
      {emptyUseCases.length === 1 && (
        <EmptyGroup isBold>
          {emptyUseCases[0].useCase.title.full} <MD tag="span">(0)</MD>
        </EmptyGroup>
      )}
    </Accordion>
  );
};
