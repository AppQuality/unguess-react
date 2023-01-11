/* eslint-disable security/detect-object-injection */
import { theme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Pill } from 'src/common/components/pills/Pill';

interface SeverityPillProps {
  severity: Severities;
  counter?: number;
}

export const SeverityPill = ({ severity, counter }: SeverityPillProps) => (
  <Pill
    color={theme.colors.bySeverity[severity]}
    backgroundColor={theme.colors.severitiesBackground[severity]}
  >
    {capitalizeFirstLetter(severity)}
    {counter && (
      <span style={{ fontWeight: theme.fontWeights.extrabold }}>{counter}</span>
    )}
  </Pill>
);
