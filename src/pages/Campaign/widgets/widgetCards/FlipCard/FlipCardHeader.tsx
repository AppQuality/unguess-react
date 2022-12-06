import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
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

export const FlipCardHeader = ({ children, hasBack }: FlipCardHeaderProps) => {
  const { visibleFace, setVisibleFace } = useFlipCardContext();

  return (
    <WidgetCardHeader
      title={children}
      action={
        hasBack === false ? null : (
          <div>
            <FlipButton
              className="flip-card-button-chart"
              isActive={visibleFace === 'front'}
              size="small"
              onClick={() => setVisibleFace('front')}
            >
              <LineGraphIconFill
                color={`${visibleFace === 'front' && 'white'}`}
              />
            </FlipButton>
            <FlipButton
              className="flip-card-button-list"
              size="small"
              isActive={visibleFace === 'back'}
              onClick={() => setVisibleFace('back')}
            >
              <ListBulletIconFill
                color={`${visibleFace === 'back' && 'white'}`}
              />
            </FlipButton>
          </div>
        )
      }
    />
  );
};
