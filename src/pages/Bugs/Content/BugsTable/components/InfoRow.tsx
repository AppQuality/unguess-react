import { MD } from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { TableBugType } from '../../../types';
import { StyledSM } from './StyledSM';

const StyledMD = styled(MD)`
  span {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.space.xs} 0;
  column-gap: ${(p) => p.theme.space.xs};
  ${StyledSM} {
    flex-shrink: 0;
  }
`;

export const InfoRow = ({
  bugs,
  title,
}: {
  bugs: TableBugType[];
  title?: ReactNode;
}) => {
  // Count bugs with read = false
  const totalBugs = bugs.length ?? 0;
  const unreadBugs = bugs.filter((bug) => bug.read === false) ?? [];
  const filterBy = getSelectedFiltersIds();

  return (
    <StyledDiv>
      <StyledMD isBold>
        {title ||
          (filterBy?.unique && filterBy.unique === 'unique' ? (
            <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_UNIQUE_BUGS_COUNTER">
              {{ uniqueBugs: totalBugs }} unique bugs
            </Trans>
          ) : (
            <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_WITH_DUPLICATED_BUGS_COUNTER">
              {{ uniqueBugs: totalBugs }} bugs
            </Trans>
          ))}
      </StyledMD>
      <StyledSM accent={appTheme.palette.blue[600]}>
        <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_UNREAD_BUGS_COUNTER">
          (Unread: <span>{{ unreadBugs: unreadBugs.length }}</span>/
          {{ uniqueBugs: totalBugs }})
        </Trans>
      </StyledSM>
    </StyledDiv>
  );
};
