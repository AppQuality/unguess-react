import { Card, MD } from '@appquality/unguess-design-system';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export const NotesTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.teal.M600};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

interface NotesProps extends HTMLAttributes<HTMLDivElement> {
  validation?: 'error' | 'warning' | 'success';
  hasIcon?: boolean;
}

export const Notes = styled(Card)<NotesProps>`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.base * 4}px;
  ${({ hasIcon, theme }) => hasIcon && `padding-left: ${theme.space.xl};`}
  box-shadow: none !important; /** TODO: temporary fix */

  & > svg {
    position: absolute;
    left: ${({ theme }) => theme.space.base * 4}px;
    top: ${({ theme }) => theme.space.base * 4 + 1}px;
  }

  ${({ validation, theme }) => {
    switch (validation) {
      case 'error':
        return `
          ${NotesTitle} { color: ${theme.colors.dangerHue}; }
          > svg {
            fill: ${theme.colors.dangerHue};
          }
        `;
      case 'warning':
        return `
          ${NotesTitle} { color: ${theme.colors.warningHue}; }
          > svg {
            fill: ${theme.colors.warningHue};
          }
        `;
      case 'success':
        return `
          ${NotesTitle} { color: ${theme.colors.successHue}; }
          > svg {
            fill: ${theme.colors.successHue};
          }
        `;
      default:
        return `
          ${NotesTitle} { color: ${theme.palette.teal.M600}; }
          > svg {
            fill: ${theme.palette.teal.M600};
          }
        `;
    }
  }}
`;
