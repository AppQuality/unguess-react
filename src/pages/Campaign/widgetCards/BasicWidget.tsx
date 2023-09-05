import {
  Tooltip,
  IconButton,
  XXXL,
  TextDescription,
  TextLabel,
} from '@appquality/unguess-design-system';
import { ReactComponent as InfoStrokeIcon } from '@zendeskgarden/svg-icons/src/16/info-stroke.svg';
import React from 'react';
import styled from 'styled-components';
import { WidgetSpecialCard } from './common/StyledSpecialCard';
import { WidgetCardFooter } from './common/WidgetCardFooter';
import { WidgetCardHeader } from './common/WidgetCardHeader';

interface BasicWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  height?: string;
}

const BasicWidget = ({ children, height, ...props }: BasicWidgetProps) => (
  <WidgetSpecialCard {...props} style={{ height }}>
    {children}
  </WidgetSpecialCard>
);

const BasicWidgetHeader = ({
  children,
  tooltipContent,
}: {
  children: React.ReactNode;
  tooltipContent?: string;
}) => (
  <WidgetCardHeader
    title={children}
    action={
      tooltipContent && (
        <Tooltip
          content={tooltipContent}
          size="large"
          type="light"
          placement="auto"
          appendToNode={document.body}
        >
          <IconButton className="button-basic-widget-tooltip" size="small">
            <InfoStrokeIcon />
          </IconButton>
        </Tooltip>
      )
    }
  />
);

const WidgetCardDescriptionContent = styled(XXXL)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

const WidgetCardDescriptionFooter = styled(TextDescription)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const BasicWidgetDescription = ({
  header,
  content,
  footer,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}) => (
  <div>
    <TextLabel>{header}</TextLabel>
    <WidgetCardDescriptionContent isBold>
      {content}
    </WidgetCardDescriptionContent>
    <WidgetCardDescriptionFooter>{footer}</WidgetCardDescriptionFooter>
  </div>
);

BasicWidget.Header = BasicWidgetHeader;
BasicWidget.Footer = WidgetCardFooter;
BasicWidget.Description = BasicWidgetDescription;
export { BasicWidget };
