/* eslint-disable security/detect-object-injection */
import { FC } from 'react';
import { theme } from 'src/app/theme';
import styled from 'styled-components';
import { Pill } from './Pill';
import { Severity } from './types';

// todo: move to theme in a way or another
const severitiesBackground = {
  critical: '#FFEEEE',
  high: '#FFF7EE',
  medium: '#EEF7FF',
  low: '#EEFFFE',
};

export const StyledPill = styled(Pill)`
  width: min-content;
  margin-right: 0;
  margin-left: auto;
`;

export const SeverityPill: FC<{ severity: Severity }> = ({
  severity,
  children,
}) => (
  <StyledPill
    color={theme.colors.bySeverity[severity]}
    backgroundColor={severitiesBackground[severity]}
  >
    {children}
  </StyledPill>
);
