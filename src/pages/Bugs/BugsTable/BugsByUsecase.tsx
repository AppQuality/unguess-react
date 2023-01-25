import {
  Accordion,
  IconButton,
  MD,
  SM,
  Tooltip,
} from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { ReactComponent as InfoStrokeIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
import styled from 'styled-components';
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

  const StyledSM = styled(SM)<{ color: string }>`
    color: ${(p) => p.theme.palette.grey[600]}};
    span {
      color: ${(p) => p.color};
    }
  `;

  const completionBreakpoints = [25, 50, 75];

  const CompletionText = styled.div`
    display: flex;
    align-items: center;
  `;

  const getCompletionText = (percentage: number) => {
    if (percentage < completionBreakpoints[0]) {
      return (
        <CompletionText>
          <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_1">
            <StyledSM color={theme.palette.red[800]} isBold>
              Use case <span>starting tests</span>
            </StyledSM>
          </Trans>
          <Tooltip
            content={t('__BUGS_PAGE_USECASE_COMPLETION_1_TOOLTIP')}
            size="large"
            type="light"
            placement="bottom-end"
            hasArrow={false}
          >
            <IconButton size="small">
              <InfoStrokeIcon />
            </IconButton>
          </Tooltip>
        </CompletionText>
      );
    }
    if (
      completionBreakpoints[0] <= percentage &&
      percentage < completionBreakpoints[1]
    ) {
      return (
        <CompletionText>
          <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_2">
            <StyledSM color={theme.colors.gubbioLight} isBold>
              Use case <span>in progress</span>
            </StyledSM>
          </Trans>
          <Tooltip
            content={t('__BUGS_PAGE_USECASE_COMPLETION_2_TOOLTIP')}
            size="large"
            type="light"
            placement="bottom-end"
            hasArrow={false}
          >
            <IconButton size="small">
              <InfoStrokeIcon />
            </IconButton>
          </Tooltip>
        </CompletionText>
      );
    }
    if (
      completionBreakpoints[1] <= percentage &&
      percentage < completionBreakpoints[2]
    ) {
      return (
        <CompletionText>
          <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_3">
            <StyledSM color={theme.colors.blueRoyal} isBold>
              Use case <span>almost ready</span>
            </StyledSM>
          </Trans>
          <Tooltip
            content={t('__BUGS_PAGE_USECASE_COMPLETION_3_TOOLTIP')}
            size="large"
            type="light"
            placement="bottom-end"
            hasArrow={false}
          >
            <IconButton size="small">
              <InfoStrokeIcon />
            </IconButton>
          </Tooltip>
        </CompletionText>
      );
    }
    // last case
    return (
      <CompletionText>
        <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_4">
          <StyledSM color={theme.colors.darkPine} isBold>
            Use case <span>completed</span>
          </StyledSM>
        </Trans>
        <Tooltip
          content={t('__BUGS_PAGE_USECASE_COMPLETION_4_TOOLTIP')}
          size="large"
          type="light"
          placement="bottom-end"
          hasArrow={false}
        >
          <IconButton size="small">
            <InfoStrokeIcon />
          </IconButton>
        </Tooltip>
      </CompletionText>
    );
  };

  return (
    <Accordion
      level={3}
      defaultExpandedSections={defaultExpandedSections}
      isExpandable
      isBare
    >
      {bugsByUseCases.map((item) => (
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
          footer={getCompletionText(item.useCase.completion)}
        />
      ))}
    </Accordion>
  );
};
