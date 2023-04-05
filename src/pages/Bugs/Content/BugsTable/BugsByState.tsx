import { Accordion, MD } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Bug } from 'src/features/api';
import { EmptyGroup } from './components/EmptyGroup';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { StyledSM } from './components/StyledSM';
import { BugByStateType } from './types';

export const BugsBySeverity = ({
  bugsBySeverity,
  allBugs,
}: {
  bugsBySeverity: BugByStateType[];
  allBugs: Bug[];
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

  if (!severities.length) {
    return <EmptyState />;
  }

  const getTableFooter = (item: BugByStateType) => {
    const total = allBugs.length;
    const totalSeverity = item.bugs.length;
    const percentage = (totalSeverity / total) * 100;
    return (
      <Trans i18nKey="__BUGS_PAGE_GROUPED_BY_SEVERITY_PERCENTAGE_OF_TOTAL">
        <StyledSM isBold accent={theme.palette.blue[600]}>
          <span>{{ percentage: percentage.toFixed(0) }}%</span> of total bugs
        </StyledSM>
      </Trans>
    );
  };

  return (
    <Accordion
      level={3}
      defaultExpandedSections={Array.from(bugsBySeverity, (_, i) => i)}
      isExpandable
      isBare
    >
      {severities.map((item) => (
        <SingleGroupTable
          title={
            <>
              {t('__BUGS_PAGE_SEVERITY', 'Severity')}:{' '}
              {capitalizeFirstLetter(item.state.name)}
              <MD tag="span">{` (${item.bugs.length})`}</MD>
            </>
          }
          key={item.state.id}
          item={item}
          footer={getTableFooter(item)}
        />
      ))}
      {emptySeverities.length > 1 && (
        <EmptyGroup isBold>
          {t('__BUGS_PAGE_OTHER_SEVERITIES', 'other severities')}{' '}
          <MD tag="span">(0)</MD>
        </EmptyGroup>
      )}
      {emptySeverities.length === 1 && (
        <EmptyGroup isBold>
          {t('__BUGS_PAGE_SEVERITY', 'Severity')}:{' '}
          {capitalizeFirstLetter(emptySeverities[0].severity.name)}{' '}
          <MD tag="span">(0)</MD>
        </EmptyGroup>
      )}
    </Accordion>
  );
};
