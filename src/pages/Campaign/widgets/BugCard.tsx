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
const BugCard = ({ children, severity }: BugCardArgs) => (
  <BugCardContainer
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
  <Anchor href={url} target="_blank">
    <MD isBold>{children}</MD>
  </Anchor>
);
BugCard.Title = BugCardTitle;

const StyledPill = styled(Tag)<
  React.ComponentProps<typeof Tag> & {
    background?: string;
    isTextWhite?: boolean;
    theme: Theme;
  }
>`
  ${({ background }) => background && `background-color: ${background};`}
  ${({ isTextWhite, theme }) =>
    isTextWhite
      ? `
    color: ${theme.palette.white};
    &:hover {
      color: ${theme.palette.white};
    }`
      : ``}
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
    };
  }

  return (
    <StyledPill size="small" isPill {...props}>
      {children}
    </StyledPill>
  );
};
BugCard.Pill = BugCardPill;

BugCard.Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xxs};
  & > * {
    &:not(:first-child):not(:last-child) {
      margin: 0 ${({ theme }) => theme.space.xxs};
    }
    &:first-child {
      margin-right: ${({ theme }) => theme.space.xxs};
    }
    &:last-child {
      margin-left: ${({ theme }) => theme.space.xxs};
    }
  }
`;
BugCard.Separator = styled.div`
  height: 16px;
  width: 1px;
  background-color: #e6e6e6;
`;

export { BugCard };
