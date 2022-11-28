import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useContext } from 'react';
import { ReactComponent as LineGraphIconFill } from '@zendeskgarden/svg-icons/src/16/line-graph-fill.svg';
import { ReactComponent as ListBulletIconFill } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg';
import { WidgetCardHeader } from '../common/WidgetCardHeader';
import { FlipCardHeaderProps } from './types';
import { FlipCardContext } from './FlipCardContext';

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

export const FlipCardHeader = ({ children }: FlipCardHeaderProps) => {
  const { visibleFace, setVisibleFace } = useContext(FlipCardContext);

  return (
    <WidgetCardHeader
      title={children}
      action={
        <div>
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
        </div>
      }
    />
  );
};
