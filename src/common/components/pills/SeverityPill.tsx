/* eslint-disable security/detect-object-injection */
import { theme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Tag } from 'src/common/Tag';

interface SeverityPillProps {
  severity: Severities;
  counter?: number;
  hasBackground?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const SeverityPill = ({
  severity,
  counter,
  hasBackground,
  size,
}: SeverityPillProps) => (
  <Tag
    size={size}
    color={theme.colors.bySeverity[severity]}
    hue={
      hasBackground ? `${theme.colors.bySeverity[severity]}14` : 'rgba(0,0,0,0)'
    }
  >
    {capitalizeFirstLetter(severity)}
    {typeof counter !== 'undefined' && (
      <Tag.SecondaryText color={theme.palette.grey[700]}>
        {counter}
      </Tag.SecondaryText>
    )}
  </Tag>
);
