/* eslint-disable security/detect-object-injection */
import { Tag } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';

interface SeverityTagProps {
  severity: Severities;
  counter?: number;
  hasBackground?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const SeverityTag = ({
  severity,
  counter,
  hasBackground,
  size,
}: SeverityTagProps) => (
  <Tag
    size={size}
    color={theme.colors.bySeverity[severity]}
    hue={
      hasBackground ? `${theme.colors.bySeverity[severity]}14` : 'rgba(0,0,0,0)'
    }
  >
    {capitalizeFirstLetter(severity)}
    {typeof counter !== 'undefined' && (
      <Tag.SecondaryText isBold color={theme.palette.grey[700]}>
        {counter}
      </Tag.SecondaryText>
    )}
  </Tag>
);
