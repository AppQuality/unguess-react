import { Accordion, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { BugBySeverityType, TableDatum } from './types';

export const BugsBySeverity = ({
  bugsBySeverity,
  columns,
}: {
  bugsBySeverity: BugBySeverityType[];
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
}) => {
  const { t } = useTranslation();
  // seems that sections index are only odd numbers ¯\_(ツ)_/¯
  // i.e. [1, 3, 5, 7]
  const defaultExpandedSections = Array.from(
    bugsBySeverity,
    (_, i) => i + (i + 1)
  );

  if (!bugsBySeverity.length) {
    return <EmptyState />;
  }
  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {bugsBySeverity.map((item) => (
        <SingleGroupTable
          title={
            <>
              {t('Severity')}: {capitalizeFirstLetter(item.severity.name)}
              <MD tag="span">{` (${item.bugs.length})`}</MD>
            </>
          }
          key={item.severity.id}
          item={item}
          columns={columns}
        />
      ))}
    </Accordion>
  );
};
