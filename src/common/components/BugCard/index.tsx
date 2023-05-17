import {
  ContainerCard,
  MD,
  SM,
  Anchor,
} from '@appquality/unguess-design-system';
import React from 'react';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';

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
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  }
`;

type BugCardArgs = React.HTMLAttributes<HTMLDivElement> & {
  children: (severity?: Severities) => React.ReactNode | React.ReactElement;
  url?: string;
} & (
    | {
        severity: Severities;
      }
    | { borderColor: string }
  );

/**
 * Example:
 * ```
 *  <BugCard severity="critical" url="#">
 *    {(severity) => (
 *       <>
 *         <BugCard.TopTitle>ID 123</BugCard.TopTitle>
 *         <BugCard.Title>
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

const StyledAnchor = styled(Anchor)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    ` 
    pointer-events: none;
    cursor: default;
    `}

  &:hover {
    text-decoration: none;
  }
`;

const BugCard = ({ children, url, ...props }: BugCardArgs) => (
  <StyledAnchor href={url} disabled={!url}>
    <BugCardContainer
      {...props}
      borderColor={
        'severity' in props
          ? appTheme.colors.bySeverity[props.severity as Severities]
          : props.borderColor
      }
    >
      {'severity' in props ? children(props.severity) : children()}
    </BugCardContainer>
  </StyledAnchor>
);

const StyledSM = styled(SM)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const BugCardTopTitle = ({ children }: { children: React.ReactNode }) => (
  <StyledSM isBold>{children}</StyledSM>
);
BugCard.TopTitle = BugCardTopTitle;

const BugCardTitle = ({ children }: { children: React.ReactNode }) => (
  <MD
    className="anchor-bug-card-title"
    style={{ color: appTheme.palette.blue[600] }}
    isBold
  >
    {children}
  </MD>
);

BugCard.Title = BugCardTitle;

BugCard.Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space.xxs};
  > * {
    margin-top: ${({ theme }) => theme.space.xs};
  }
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
