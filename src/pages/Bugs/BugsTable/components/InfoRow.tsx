import { MD, SM } from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { Bug } from 'src/features/api';
import styled from 'styled-components';

const StyledMD = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[800]};
  span {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.space.xs} 0;
`;

export const InfoRow = ({
  bugs,
  title,
}: {
  bugs: Bug[];
  title?: ReactNode;
}) => {
  // Count bugs with read = false
  const totalBugs = bugs.length ?? 0;
  const unreadBugs = bugs.filter((bug) => bug.read === false) ?? [];

  return (
    <StyledDiv>
      <StyledMD isBold>
        {title || (
          <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_UNIQUE_BUGS_COUNTER">
            {{ uniqueBugs: totalBugs }} unique bugs
          </Trans>
        )}
      </StyledMD>
      <StyledSM>
        <Trans i18nKey="__BUGS_PAGE_TABLE_HEADER_UNREAD_BUGS_COUNTER">
          (Unread: <span>{{ unreadBugs: unreadBugs.length }}</span>/
          {{ uniqueBugs: totalBugs }})
        </Trans>
      </StyledSM>
    </StyledDiv>
  );
};
