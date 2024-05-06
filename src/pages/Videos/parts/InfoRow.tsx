import { MD, SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { CampaignVideoResponseItem } from '../types';

const StyledMD = styled(MD)`
  span {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

export const StyledSM = styled(SM)<{ accent?: string }>`
  color: ${(p) => p.theme.palette.grey[600]};
  span {
    color: ${(p) => p.accent};
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

export const InfoRow = ({ videos, usecase }: CampaignVideoResponseItem) => (
  <StyledDiv>
    <StyledMD isBold>
      {usecase.title}
      <MD tag="span">{` (${videos.length ?? 0})`}</MD>
    </StyledMD>
  </StyledDiv>
);
