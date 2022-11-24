import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as LineGraphIconStroke } from '@zendeskgarden/svg-icons/src/16/line-graph-stroke.svg';
import { ReactComponent as LineGraphIconFill } from '@zendeskgarden/svg-icons/src/16/line-graph-fill.svg';
import { ReactComponent as ListBulletIconStroke } from '@zendeskgarden/svg-icons/src/16/list-bullet-stroke.svg';
import { ReactComponent as ListBulletIconFill } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg';
import { WidgetCardHeader } from '../common/WidgetCardHeader';
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

export const FlipCardHeader = ({
  children,
  setVisibleFace,
  visibleFace,
}: FlipCardHeaderProps) => (
  <WidgetCardHeader
    title={children}
    action={
      setVisibleFace && (
        <div>
          <FlipButton
            isActive={visibleFace === 'front'}
            size="small"
            onClick={() => setVisibleFace('front')}
          >
            <>
              {visibleFace === 'front' && <LineGraphIconFill color="white" />}
              {visibleFace === 'back' && <LineGraphIconStroke />}
            </>
          </FlipButton>
          <FlipButton
            size="small"
            isActive={visibleFace === 'back'}
            onClick={() => setVisibleFace('back')}
          >
            <>
              {visibleFace === 'front' && <ListBulletIconStroke />}
              {visibleFace === 'back' && <ListBulletIconFill color="white" />}
            </>
          </FlipButton>
        </div>
      )
    }
  />
);
