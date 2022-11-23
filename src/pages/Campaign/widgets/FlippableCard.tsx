import {
  SpecialCard,
  Tooltip,
  IconButton,
  XXXL,
  MD,
  SM,
  theme as ugTheme,
} from '@appquality/unguess-design-system';
import { ReactComponent as LineGraphIcon } from '@zendeskgarden/svg-icons/src/16/line-graph-stroke.svg';
import { ReactComponent as ListBulletIcon } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg';
import React from 'react';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';

const StyledSpecialCard = styled(SpecialCard)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;
const FlippableCard = ({ children }: { children: React.ReactNode }) => (
  <StyledSpecialCard>{children}</StyledSpecialCard>
);

const CapitalizeFirstLetter = styled.div`
  &:first-letter {
    text-transform: uppercase;
  }
`;
const WidgetCardHeader = ({
  children,
  tooltipContent,
}: {
  children: React.ReactNode;
  tooltipContent: string;
}) => (
  <>
    <SpecialCard.Meta justifyContent="space-between">
      <MD style={{ color: ugTheme.palette.grey[800] }}>
        <CapitalizeFirstLetter>{children}</CapitalizeFirstLetter>
      </MD>
      <div>
        <IconButton size="small">
          <LineGraphIcon />
        </IconButton>
        <IconButton size="small">
          <ListBulletIcon />
        </IconButton>
      </div>
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
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) => (
  <div>
    <WidgetCardFaceContent className="visible">{front}</WidgetCardFaceContent>
    <WidgetCardFaceContent>{back}</WidgetCardFaceContent>
  </div>
);

FlippableCard.Header = WidgetCardHeader;
FlippableCard.Footer = WidgetCardFooter;
FlippableCard.Body = WidgetCardBody;
export { FlippableCard };
