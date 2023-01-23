import { Accordion, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { BugByUsecaseType, TableDatum } from './types';

export const BugsByUsecase = ({
  bugsByUseCases,
  columns,
}: {
  bugsByUseCases: BugByUsecaseType[];
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
}) => {
  const { t } = useTranslation();
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
      {bugsByUseCases.map((item) => {
        const unread = item.bugs.filter((bug) => !bug.read).length;
        return (
          <Accordion.Section key={item.useCase.id}>
            <Accordion.Header>
              <Accordion.Label>
                <MD isBold>{item.useCase.title}</MD>
              </Accordion.Label>
              <div style={{ flex: '0 0 auto' }}>
                {t('__BUGS_PAGE_ACCORDION_LABEL_UNREAD_FRACTION', {
                  count: unread,
                  defaultValue: 'unread',
                })}{' '}
                ({unread}/{item.bugs.length})
              </div>
            </Accordion.Header>
            <SingleGroupTable bugs={item.bugs} columns={columns} />
          </Accordion.Section>
        );
      })}
    </Accordion>
  );
};
