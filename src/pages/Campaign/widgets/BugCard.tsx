import {
  SpecialCard,
  Tag,
  MD,
  SM,
  Anchor,
} from '@appquality/unguess-design-system';
import React from 'react';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';

const BugCardContainer = styled(SpecialCard)<
  React.ComponentProps<typeof Tag> & {
    borderColor: string;
  }
>`
  border-left: 2px solid ${(props) => props.borderColor};
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`;

const BugCard = ({
  children,
  severity,
}: {
  children: React.ReactNode;
  severity: Severities;
}) => (
  <BugCardContainer
    borderColor={globalTheme.colors.bySeverity[severity as Severities]}
  >
    {children}
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
    color?: string;
  }
>`
  ${({ background }) => background && `background-color: ${background};`}
  ${({ color }) => color && `color: ${color};`}
`;

const BugCardPill = ({
  children,
  severity,
}: {
  children: React.ReactNode;
  severity?: Severities;
}) => {
  let background;
  let color;
  if (severity) {
    background = globalTheme.colors.bySeverity[severity as Severities];
    color = 'white';
  }

  return (
    <StyledPill isPill background={background} color={color}>
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
