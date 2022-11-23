import {
  SpecialCard,
  Tooltip,
  IconButton,
  XXXL,
  MD,
  SM,
  theme as ugTheme,
} from '@appquality/unguess-design-system';
import { ReactComponent as InfoStrokeIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
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
          <InfoStrokeIcon />
        </IconButton>
        <IconButton size="small">
          <InfoStrokeIcon />
        </IconButton>
      </div>
    </SpecialCard.Meta>
    <Divider />
  </>
);

const WidgetCardFooter = ({ children }: { children: React.ReactNode }) => (
  <SpecialCard.Footer>{children}</SpecialCard.Footer>
);

const WidgetCardDescriptionHeader = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const WidgetCardDescriptionContent = styled(XXXL)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

const WidgetCardDescriptionFooter = styled(MD)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.blue[600]};
`;

const WidgetCardDescription = ({
  header,
  content,
  footer,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}) => (
  <div>
    <WidgetCardDescriptionHeader>{header}</WidgetCardDescriptionHeader>
    <WidgetCardDescriptionContent isBold>
      {content}
    </WidgetCardDescriptionContent>
    <WidgetCardDescriptionFooter>{footer}</WidgetCardDescriptionFooter>
  </div>
);

FlippableCard.Header = WidgetCardHeader;
FlippableCard.Footer = WidgetCardFooter;
FlippableCard.Description = WidgetCardDescription;
export { FlippableCard };
