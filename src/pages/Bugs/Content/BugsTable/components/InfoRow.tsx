import { Span } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { TableBugType } from '../../../types';
import { StyledSM } from './StyledSM';

export const InfoRow = ({ bugs }: { bugs: TableBugType[] }) => {
  // Count bugs with read = false
  const totalBugs = bugs.length ?? 0;
  const unreadBugs = bugs.filter((bug) => bug.read === false) ?? [];

  return (
    <StyledSM accent={appTheme.palette.blue[600]}>
      <Trans
        i18nKey="__BUGS_PAGE_TABLE_HEADER_UNREAD_BUGS_COUNTER"
        components={{
          span: <Span />,
        }}
        defaults="(Unread: <span>{{unreadBugs}}</span>/{{uniqueBugs}})"
        values={{
          unreadBugs: unreadBugs.length,
          uniqueBugs: totalBugs,
        }}
      />
    </StyledSM>
  );
};
