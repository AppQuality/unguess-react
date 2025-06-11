import { Card, MD } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

const NotesTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.teal[600]};
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

  ${({ validation }) => {
    switch (validation) {
      case 'error':
        return `
          ${NotesTitle} { color: ${appTheme.components.text.dangerColor}; }
          > svg {
            fill: ${appTheme.components.text.dangerColor};
          }
        `;
      case 'warning':
        return `
          ${NotesTitle} { color: ${appTheme.components.text.warningColor}; }
          > svg {
            fill: ${appTheme.components.text.warningColor};
          }
        `;
      case 'success':
        return `
          ${NotesTitle} { color: ${appTheme.components.text.successColor}; }
          > svg {
            fill: ${appTheme.components.text.successColor};
          }
        `;
      default:
        return `
          ${NotesTitle} { color: ${appTheme.palette.teal[600]}; }
          > svg {
            fill: ${appTheme.palette.teal[600]};
          }
        `;
    }
  }}
`;
