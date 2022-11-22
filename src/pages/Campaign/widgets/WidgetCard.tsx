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
const WidgetCard = ({ children }: { children: React.ReactNode }) => (
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
      <SpecialCard.Header.Title color={ugTheme.palette.grey[800]}>
        <CapitalizeFirstLetter>{children}</CapitalizeFirstLetter>
      </SpecialCard.Header.Title>
      <Tooltip content={tooltipContent} size="large" type="light">
        <IconButton size="small">
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

WidgetCard.Header = WidgetCardHeader;
WidgetCard.Footer = WidgetCardFooter;
WidgetCard.Description = WidgetCardDescription;
export { WidgetCard };
