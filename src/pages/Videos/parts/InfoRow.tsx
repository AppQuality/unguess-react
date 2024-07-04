import { Editor, MD, SM, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { CampaignVideos } from '../useVideos';

export const StyledSM = styled(SM)`
  color: ${(p) => p.theme.palette.grey[600]};
`;

const StyledDiv = styled.div`
  padding: ${(p) => p.theme.space.xs} 0;
`;

const EditorContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.xxs};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  * {
    user-select: none;
    padding: 0;
    background-color: transparent;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  *:focus {
    box-shadow: none;
    outline: none !important;
  }
`;

export const InfoRow = ({ uc }: { uc: CampaignVideos[number] }) => {
  const { t } = useTranslation();
  const { usecase, videos } = uc;

  return (
    <StyledDiv>
      <MD>
        <Span isBold>{usecase.title} </Span>
        <Span style={{ color: appTheme.palette.grey[600] }}>
          {`(${videos.total} ${t('__VIDEOS_LIST_USECASE_INFO', {
            count: videos.total,
          })})`}
        </Span>
      </MD>
    </StyledDiv>
  );
};
