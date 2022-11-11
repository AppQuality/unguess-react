import { Span, Tag } from '@appquality/unguess-design-system';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledTag = styled(Tag)`
  background: transparent;
  color: ${(props) => props.hue};
  pointer-events: none;

  svg {
    margin-right: ${({ theme }) => theme.space.xxs} !important;
  }
`;

const StyledSpan = styled(Span)`
  margin-left: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.grey[700]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Pill: FC<{ hue?: string; icon?: ReactNode; title: string }> = ({
  hue,
  icon,
  title,
  children,
}) => (
  <StyledTag isPill isRegular hue={hue}>
    {icon as ReactNode}

    <Span isBold>{title}</Span>
    {children && <StyledSpan>{children}</StyledSpan>}
  </StyledTag>
);
