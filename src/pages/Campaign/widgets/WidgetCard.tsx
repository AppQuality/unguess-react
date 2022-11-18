import {
  SpecialCard,
  Tooltip,
  IconButton,
  XXL,
  MD,
  SM,
} from '@appquality/unguess-design-system';
import { ReactComponent as InfoStrokeIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
import React from 'react';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';

const StyledSpecialCard = styled(SpecialCard)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;
const WidgetCard = ({ children }: { children: React.ReactNode }) => (
  <StyledSpecialCard>{children}</StyledSpecialCard>
);

const WidgetCardHeader = ({
  children,
  tooltipContent,
}: {
  children: React.ReactNode;
  tooltipContent: string;
}) => (
  <>
    <SpecialCard.Meta justifyContent="space-between">
      <SpecialCard.Header.Title>{children}</SpecialCard.Header.Title>
      <Tooltip content={tooltipContent}>
        <IconButton>
          <InfoStrokeIcon />
        </IconButton>
      </Tooltip>
    </SpecialCard.Meta>
    <Divider />
  </>
);

const WidgetCardFooter = ({ children }: { children: React.ReactNode }) => (
  <SpecialCard.Footer>{children}</SpecialCard.Footer>
);

const WidgetCardDescriptionHeader = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const WidgetCardDescriptionContent = styled(XXL)`
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

WidgetCard.Header = WidgetCardHeader;
WidgetCard.Footer = WidgetCardFooter;
WidgetCard.Description = WidgetCardDescription;
export { WidgetCard };
