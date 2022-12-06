import {
  ContainerCard,
  Tag,
  MD,
  SM,
  Anchor,
} from '@appquality/unguess-design-system';
import React from 'react';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';

const BugCardContainer = styled(ContainerCard)<
  React.ComponentProps<typeof ContainerCard> & {
    borderColor: string;
  }
>`
  padding: ${({ theme }) => theme.space.sm};
  border: 0;
  border-left: 2px solid ${(props) => props.borderColor};
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`;

type BugCardArgs = {
  severity: Severities;
  children: (severity: Severities) => React.ReactNode | React.ReactElement;
  className?: string;
};

/**
 * Example:
 * ```
 *  <BugCard severity="critical">
 *    {(severity) => (
 *       <>
 *         <BugCard.TopTitle>ID 123</BugCard.TopTitle>
 *         <BugCard.Title url="#">
 *           Title
 *         </BugCard.Title>
 *          <BugCard.Description>
 *            Use case: Use Case 3 - Check-out e pagamento
 *            [Gruppo A]
 *          </BugCard.Description>
 *         <BugCard.Footer>
 *           <BugCard.Pill>Pill1</BugCard.Pill>
 *           <BugCard.Pill>Pill1</BugCard.Pill>
 *           <BugCard.Separator />
 *           <BugCard.Pill severity={severity}>
 *             {severity}
 *           </BugCard.Pill>
 *         </BugCard.Footer>
 *       </>
 *     )}
 *   </BugCard>
 * ```
 */
const BugCard = ({ children, severity, className }: BugCardArgs) => (
  <BugCardContainer
    className={className}
    borderColor={globalTheme.colors.bySeverity[severity as Severities]}
  >
    {children(severity)}
  </BugCardContainer>
);

const StyledSM = styled(SM)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const BugCardTopTitle = ({ children }: { children: React.ReactNode }) => (
  <StyledSM isBold>{children}</StyledSM>
);
BugCard.TopTitle = BugCardTopTitle;

const BugCardTitle = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => (
  <Anchor className="anchor-bug-card-title" href={url} target="_blank">
    <MD isBold>{children}</MD>
  </Anchor>
);
BugCard.Title = BugCardTitle;

const StyledPill = styled(Tag)<
  React.ComponentProps<typeof Tag> & {
    background?: string;
    isTextWhite?: boolean;
    textTransform?: string;
    theme: Theme;
  }
>`
  margin-top: ${({ theme }) => theme.space.xs};
  margin-right: ${({ theme }) => theme.space.xs};
  &:last-child {
    margin-right: 0;
  }
  ${({ background }) => background && `background-color: ${background};`}
  ${({ isTextWhite, theme }) =>
    isTextWhite
      ? `
    color: ${theme.palette.white};
    &:hover {
      color: ${theme.palette.white};
    }`
      : ``}
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
`;

const BugCardPill = ({
  children,
  severity,
}: {
  children: React.ReactNode;
  severity?: Severities;
}) => {
  let props = {};
  if (severity) {
    props = {
      ...props,
      background: globalTheme.colors.bySeverity[severity as Severities],
      isTextWhite: true,
      textTransform: 'capitalize',
    };
  }

  return (
    <StyledPill isPill {...props}>
      {children}
    </StyledPill>
  );
};
BugCard.Pill = BugCardPill;

BugCard.Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;
BugCard.Separator = styled.div`
  height: 16px;
  width: 1px;
  background-color: #e6e6e6;
`;

const BugCardDescription = styled(SM)`
  color: ${({ theme }) => theme.palette.grey['700']};
  margin-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;
BugCard.Description = BugCardDescription;

export { BugCard };
