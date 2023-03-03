/* eslint-disable security/detect-object-injection */
import { Tag } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Meta, MetaSize } from '../Meta';

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
    color={theme.colors.bySeverity[severity]}
    hue={
      hasBackground ? `${theme.colors.bySeverity[severity]}14` : 'rgba(0,0,0,0)'
    }
    isRegular={isRegular}
  >
    {capitalizeFirstLetter(severity)}
    {typeof counter !== 'undefined' && (
      <Tag.SecondaryText isBold color={theme.palette.grey[700]}>
        {counter}
      </Tag.SecondaryText>
    )}
  </Tag>
);

interface SeverityMetaProps {
  severity: Severities;
  counter?: number;
  size?: MetaSize;
}
export const SeverityMeta = ({
  severity,
  counter,
  size,
}: SeverityMetaProps) => (
  <Meta
    size={size}
    color={theme.colors.bySeverity[severity]}
    secondaryText={counter}
  >
    {capitalizeFirstLetter(severity)}
  </Meta>
);
