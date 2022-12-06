import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { ReactComponent as LineGraphIconFill } from 'src/assets/icons/line-graph-fill.svg';
import { ReactComponent as ListBulletIconFill } from 'src/assets/icons/list-bullet-fill.svg';
import { WidgetCardHeader } from '../common/WidgetCardHeader';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardHeaderProps } from './types';

const FlipButton = styled(IconButton)<{ isActive?: boolean }>`
  background-color: ${(p) =>
    p.isActive ? p.theme.palette.blue[600] : 'transparent'};
  &:hover {
    background-color: ${(p) =>
      p.isActive ? p.theme.palette.blue[600] : p.theme.palette.grey[100]};
  }
  transition: background-color 0.25s ease-in-out;
  margin-left: ${(p) => p.theme.space.xs};
`;

export const FlipButtonContainer = styled.div`
  display: flex;
`;

export const FlipCardHeader = ({ children, hasBack }: FlipCardHeaderProps) => {
  const { visibleFace, setVisibleFace, width } = useFlipCardContext();
  const breakpointMd = parseInt(globalTheme.breakpoints.md, 10);

  return (
    <WidgetCardHeader
      title={children}
      action={
        hasBack === false || width < breakpointMd ? null : (
          <FlipButtonContainer>
            <FlipButton
              isActive={visibleFace === 'front'}
              size="small"
              onClick={() => setVisibleFace('front')}
            >
              <LineGraphIconFill
                color={`${visibleFace === 'front' && 'white'}`}
              />
            </FlipButton>
            <FlipButton
              size="small"
              isActive={visibleFace === 'back'}
              onClick={() => setVisibleFace('back')}
            >
              <ListBulletIconFill
                color={`${visibleFace === 'back' && 'white'}`}
              />
            </FlipButton>
          </FlipButtonContainer>
        )
      }
    />
  );
};
