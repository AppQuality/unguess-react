import { Accordion, MD } from '@appquality/unguess-design-system';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { BugByUsecaseType, TableDatum } from './types';
import { CompletionTooltip } from './components/CompletionTooltip';

export const BugsByUsecase = ({
  bugsByUseCases,
  columns,
}: {
  bugsByUseCases: BugByUsecaseType[];
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
}) => {
  // seems that sections index are only odd numbers ¯\_(ツ)_/¯
  // i.e. [1, 3, 5, 7]
  const defaultExpandedSections = Array.from(
    bugsByUseCases,
    (_, i) => i + (i + 1)
  );

  if (!bugsByUseCases.length) {
    return <EmptyState />;
  }

  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {bugsByUseCases.map(
        (item) =>
          item.bugs.length > 0 && (
            <SingleGroupTable
              key={item.useCase.id}
              title={
                <>
                  {item.useCase.title.full}
                  <MD tag="span">{` (${item.bugs.length})`}</MD>
                </>
              }
              item={item}
              columns={columns}
              footer={
                <CompletionTooltip percentage={item.useCase.completion} />
              }
            />
          )
      )}
    </Accordion>
  );
};
