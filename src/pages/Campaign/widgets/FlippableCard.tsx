import {
  SpecialCard,
  IconButton,
  MD,
  theme as ugTheme,
} from '@appquality/unguess-design-system';
import { ReactComponent as LineGraphIconStroke } from '@zendeskgarden/svg-icons/src/16/line-graph-stroke.svg';
import { ReactComponent as LineGraphIconFill } from '@zendeskgarden/svg-icons/src/16/line-graph-fill.svg';
import { ReactComponent as ListBulletIconStroke } from '@zendeskgarden/svg-icons/src/16/list-bullet-stroke.svg';
import { ReactComponent as ListBulletIconFill } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg';
import React, { Children, FC } from 'react';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';

const StyledSpecialCard = styled(SpecialCard)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;

type FaceType = 'front' | 'back';

interface FlipCardHeader {
  visibleFace: FaceType;
  setVisibleFace: (face: FaceType) => void;
}
interface FlipCardBody {
  visibleFace: FaceType;
}

const FlippableCard = ({ children }: { children?: React.ReactNode }) => {
  const [visibleFace, setVisibleFace] = React.useState<FaceType>('front');
  const cardChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    if (
      typeof child.type !== 'string' &&
      child.type.name === 'WidgetCardHeader'
    ) {
      const el = React.cloneElement<FlipCardHeader>(
        child as React.ReactElement,
        {
          visibleFace,
          setVisibleFace,
        }
      );
      return el;
    }
    if (
      typeof child.type !== 'string' &&
      child.type.name === 'WidgetCardBody'
    ) {
      const el = React.cloneElement<FlipCardBody>(child as React.ReactElement, {
        visibleFace,
      });
      return el;
    }
    return child;
  });

  return <StyledSpecialCard>{cardChildren}</StyledSpecialCard>;
};

const CapitalizeFirstLetter = styled.div`
  &:first-letter {
    text-transform: uppercase;
  }
`;
const WidgetCardHeader = ({
  children,
  setVisibleFace,
  visibleFace,
}: {
  children: React.ReactNode;
  setVisibleFace?: (face: FaceType) => void;
  visibleFace?: FaceType;
}) => (
  <>
    <SpecialCard.Meta justifyContent="space-between">
      <MD style={{ color: ugTheme.palette.grey[800] }}>
        <CapitalizeFirstLetter>{children}</CapitalizeFirstLetter>
      </MD>
      {setVisibleFace && (
        <div>
          <IconButton
            size="small"
            style={{
              backgroundColor:
                visibleFace === 'front'
                  ? ugTheme.palette.blue[600]
                  : 'transparent',
            }}
            onClick={() => setVisibleFace('front')}
          >
            <>
              {visibleFace === 'front' && <LineGraphIconFill color="white" />}
              {visibleFace === 'back' && <LineGraphIconStroke />}
            </>
          </IconButton>
          <IconButton
            size="small"
            style={{
              backgroundColor:
                visibleFace === 'back'
                  ? ugTheme.colors.primaryHue
                  : 'transparent',
            }}
            onClick={() => setVisibleFace('back')}
          >
            <>
              {visibleFace === 'front' && <ListBulletIconStroke />}
              {visibleFace === 'back' && <ListBulletIconFill color="white" />}
            </>
          </IconButton>
        </div>
      )}
    </SpecialCard.Meta>
    <Divider />
  </>
);

const WidgetCardFooter = ({ children }: { children: React.ReactNode }) => (
  <SpecialCard.Footer>{children}</SpecialCard.Footer>
);

const WidgetCardFaceContent = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
  display: none;
    &.visible {
      display: block;
    }
  }
`;

const WidgetCardBody = ({
  front,
  back,
  visibleFace,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  visibleFace?: FaceType;
}) => (
  <div>
    <WidgetCardFaceContent
      className={`${visibleFace === 'front' ? 'visible' : ''}`}
    >
      {front}
    </WidgetCardFaceContent>
    <WidgetCardFaceContent
      className={`${visibleFace === 'back' ? 'visible' : ''}`}
    >
      {back}
    </WidgetCardFaceContent>
  </div>
);

FlippableCard.Header = WidgetCardHeader;
FlippableCard.Footer = WidgetCardFooter;
FlippableCard.Body = WidgetCardBody;
export { FlippableCard };
