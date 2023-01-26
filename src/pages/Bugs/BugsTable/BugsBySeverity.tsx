import { Accordion, MD, SM } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { EmptyGroup } from './components/EmptyGroup';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { BugBySeverityType, TableDatum } from './types';

export const BugsBySeverity = ({
  bugsBySeverity,
  allBugs,
  columns,
}: {
  bugsBySeverity: BugBySeverityType[];
  allBugs: Bug[];
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
}) => {
  const emptySeverities = useMemo(
    () => bugsBySeverity.filter((item) => item.bugs.length === 0),
    [bugsBySeverity]
  );
  const severities = useMemo(
    () => bugsBySeverity.filter((item) => item.bugs.length > 0),
    [bugsBySeverity]
  );
  const { t } = useTranslation();
  // seems that sections index are only odd numbers ¯\_(ツ)_/¯
  // i.e. [1, 3, 5, 7]
  const defaultExpandedSections = Array.from(
    bugsBySeverity,
    (_, i) => i + (i + 1)
  );

  if (!severities.length) {
    return <EmptyState />;
  }

  const StyledSM = styled(SM)`
    color: ${(p) => p.theme.palette.grey[600]}};
    span {
      color: ${(p) => p.theme.palette.blue[600]};
    }
  `;

  const getTableFooter = (item: BugBySeverityType) => {
    const total = allBugs.length;
    const totalSeverity = item.bugs.length;
    const percentage = (totalSeverity / total) * 100;
    return (
      <Trans i18nKey="__BUGS_PAGE_GROUPED_BY_SEVERITY_PERCENTAGE_OF_TOTAL">
        <StyledSM isBold>
          <span>{{ percentage: percentage.toFixed(0) }}%</span> of total bugs
        </StyledSM>
      </Trans>
    );
  };

  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {severities.map((item) => (
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
          footer={getTableFooter(item)}
        />
      ))}
      {emptySeverities.length > 1 && (
        <EmptyGroup isBold>
          {t('other use cases')} <MD tag="span">(0)</MD>
        </EmptyGroup>
      )}
      {emptySeverities.length === 1 && (
        <EmptyGroup isBold>
          {t('Severity:')}{' '}
          {capitalizeFirstLetter(emptySeverities[0].severity.name)}{' '}
          <MD tag="span">(0)</MD>
        </EmptyGroup>
      )}
    </Accordion>
  );
};
