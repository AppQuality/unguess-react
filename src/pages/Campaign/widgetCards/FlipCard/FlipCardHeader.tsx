import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as LineGraphIconFill } from 'src/assets/icons/line-graph-fill.svg';
import { ReactComponent as ListBulletIconFill } from 'src/assets/icons/list-bullet-fill.svg';
import { ReactNode } from 'react';
import { WidgetCardHeader } from '../common/WidgetCardHeader';
import { useFlipCardContext } from './context';

const FlipButton = styled(IconButton)`
  margin-left: ${(p) => p.theme.space.xs};
`;

export const FlipButtonContainer = styled.div`
  display: none;
  @container (min-width: 500px) {
    display: flex;
  }
`;

export const FlipCardHeader = ({ children }: { children: ReactNode }) => {
  const { visibleFace, setVisibleFace } = useFlipCardContext();

  return (
    <WidgetCardHeader
      title={children}
      action={
        <FlipButtonContainer>
          <FlipButton
            className="flip-card-button-chart"
            isPrimary={visibleFace === 'front'}
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
            isPrimary={visibleFace === 'back'}
            onClick={() => setVisibleFace('back')}
          >
            <ListBulletIconFill
              color={`${visibleFace === 'back' && 'white'}`}
            />
          </FlipButton>
        </FlipButtonContainer>
      }
    />
  );
};
