/* eslint-disable security/detect-object-injection */
import { Tag } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';

interface SeverityTagProps {
  severity: Severities;
  counter?: number;
  hasBackground?: boolean;
  size?: 'small' | 'medium' | 'large';
  isRegular?: boolean;
}

export const SeverityTag = ({
  severity,
  counter,
  hasBackground,
  size,
  isRegular,
}: SeverityTagProps) => (
  <Tag
    size={size}
    color={appTheme.colors.bySeverity[severity]}
    hue={
      hasBackground
        ? `${appTheme.colors.bySeverity[severity]}14`
        : 'rgba(0,0,0,0)'
    }
    isRegular={isRegular}
  >
    {capitalizeFirstLetter(severity)}
    {typeof counter !== 'undefined' && (
      <Tag.SecondaryText isBold color={appTheme.palette.grey[700]}>
        {counter}
      </Tag.SecondaryText>
    )}
  </Tag>
);
