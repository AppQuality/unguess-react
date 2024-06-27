import { MD, SM, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

export const StyledSM = styled(SM)`
  color: ${(p) => p.theme.palette.grey[600]};
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
  videos,
  usecase,
}: {
  videos: number;
  usecase: string;
}) => {
  const { t } = useTranslation();
  return (
    <StyledDiv>
      <MD>
        <Span isBold>{usecase} </Span>
        <Span style={{ color: appTheme.palette.grey[600] }}>{`(${videos} ${t(
          '__VIDEOS_LIST_USECASE_INFO',
          {
            count: videos,
          }
        )})`}</Span>
      </MD>
    </StyledDiv>
  );
};
