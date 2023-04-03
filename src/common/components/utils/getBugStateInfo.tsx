/* eslint-disable security/detect-object-injection */
import { TFunction } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import styled from 'styled-components';

type BugStateInfo = {
  icon: React.ReactNode;
  text: string;
};

const Circle = styled(CircleFill)`
  width: auto;
  height: 100%;
  max-height: 10px;
  margin: 0 2px;
`;

export const getBugStateInfo = (
  state: BugState,
  t: TFunction
): BugStateInfo => {
  switch (state.toLowerCase()) {
    case 'to do':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_TO_DO'),
      };
    case 'pending':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_PENDING'),
      };
    case 'to be imported':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_TO_BE_IMPORTED'),
      };
    case 'open':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_OPEN'),
      };
    case 'to be retested':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_TO_BE_RETESTED'),
      };
    case 'solved':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_SOLVED'),
      };
    case 'not a bug':
      return {
        icon: <Circle {...globalTheme.colors.byBugState[state]} />,
        text: t('__BUG_STATE_NOT_A_BUG'),
      };
    default:
      return {
        icon: <Circle {...globalTheme.colors.byBugState['to do']} />,
        text: t('__BUG_STATE_TO_DO'),
      };
  }
};
