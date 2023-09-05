import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { ReactComponent as LineGraphIconFill } from 'src/assets/icons/line-graph-fill.svg';
import { ReactComponent as ListBulletIconFill } from 'src/assets/icons/list-bullet-fill.svg';
import { WidgetCardHeader } from '../common/WidgetCardHeader';
import { useFlipCardContext } from './context/FlipCardContext';
import { FlipCardHeaderProps } from './types';

const FlipButton = styled(IconButton)`
  margin-left: ${(p) => p.theme.space.xs};
`;

export const FlipButtonContainer = styled.div`
  display: flex;
`;

export const FlipCardHeader = ({ children, hasBack }: FlipCardHeaderProps) => {
  const { visibleFace, setVisibleFace, width } = useFlipCardContext();
  const breakpointMd = parseInt(appTheme.breakpoints.lg, 10);

  return (
    <WidgetCardHeader
      title={children}
      action={
        hasBack === false || width < breakpointMd ? null : (
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
        )
      }
    />
  );
};
