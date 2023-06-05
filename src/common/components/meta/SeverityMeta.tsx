/* eslint-disable security/detect-object-injection */
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Meta, MetaSize } from '../Meta';

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
    color={appTheme.colors.bySeverity[severity]}
    secondaryText={counter}
  >
    {capitalizeFirstLetter(severity)}
  </Meta>
);
