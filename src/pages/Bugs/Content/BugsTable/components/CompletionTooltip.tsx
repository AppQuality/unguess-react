import { IconButton, Tooltip } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { ReactComponent as InfoStrokeIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
import { StyledSM } from './StyledSM';

export const CompletionTooltip = ({ percentage }: { percentage: number }) => {
  const { t } = useTranslation();

  const completionBreakpoints = [25, 50, 75];

  const CompletionText = styled.div`
    display: flex;
    align-items: center;
  `;

  const getCompletionText = () => {
    if (percentage < completionBreakpoints[0]) {
      return (
        <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_1">
          <StyledSM accent={appTheme.palette.red[700]} isBold>
            Use case <span>starting tests</span>
          </StyledSM>
        </Trans>
      );
    }
    if (
      completionBreakpoints[0] <= percentage &&
      percentage < completionBreakpoints[1]
    ) {
      return (
        <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_2">
          <StyledSM accent={appTheme.palette.yellow[700]} isBold>
            Use case <span>in progress</span>
          </StyledSM>
        </Trans>
      );
    }
    if (
      completionBreakpoints[1] <= percentage &&
      percentage < completionBreakpoints[2]
    ) {
      return (
        <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_3">
          <StyledSM accent={appTheme.palette.blue[700]} isBold>
            Use case <span>almost ready</span>
          </StyledSM>
        </Trans>
      );
    }
    // last case
    return (
      <Trans i18nKey="__BUGS_PAGE_USECASE_COMPLETION_4">
        <StyledSM accent={appTheme.palette.kale[700]} isBold>
          Use case <span>completed</span>
        </StyledSM>
      </Trans>
    );
  };

  const getCompletionTooltip = () => {
    if (percentage < completionBreakpoints[0]) {
      return t('__BUGS_PAGE_USECASE_COMPLETION_1_TOOLTIP');
    }
    if (
      completionBreakpoints[0] <= percentage &&
      percentage < completionBreakpoints[1]
    ) {
      return t('__BUGS_PAGE_USECASE_COMPLETION_2_TOOLTIP');
    }
    if (
      completionBreakpoints[1] <= percentage &&
      percentage < completionBreakpoints[2]
    ) {
      return t('__BUGS_PAGE_USECASE_COMPLETION_3_TOOLTIP');
    }
    // last case
    return t('__BUGS_PAGE_USECASE_COMPLETION_4_TOOLTIP');
  };

  return (
    <CompletionText>
      {getCompletionText()}
      <Tooltip
        content={getCompletionTooltip()}
        size="large"
        type="light"
        placement="bottom-start"
        hasArrow={false}
      >
        <IconButton size="small" style={{ background: 'transparent' }}>
          <InfoStrokeIcon />
        </IconButton>
      </Tooltip>
    </CompletionText>
  );
};
