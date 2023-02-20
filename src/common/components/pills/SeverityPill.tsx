/* eslint-disable security/detect-object-injection */
import { theme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Tag } from 'src/common/Tag';

interface SeverityPillProps {
  severity: Severities;
  counter?: number;
}

export const SeverityPill = ({ severity, counter }: SeverityPillProps) => (
  <Tag
    isRegular
    color={theme.colors.bySeverity[severity]}
    hue={`${theme.colors.bySeverity[severity]}14`}
  >
    <span>
      {capitalizeFirstLetter(severity)}
      {typeof counter !== 'undefined' && (
        <span style={{ fontWeight: theme.fontWeights.extrabold }}>
          {` ${counter}`}
        </span>
      )}
    </span>
  </Tag>
);
