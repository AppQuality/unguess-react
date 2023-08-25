import {
  getColor,
  Paragraph,
  theme,
  XXL,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

export const SectionTitle = ({
  id,
  title,
  subtitle,
}: {
  title: string;
  id?: string;
  subtitle?: string;
}) => (
  <>
    <XXL
      id={id}
      style={{
        fontWeight: appTheme.fontWeights.medium,
        marginBottom: appTheme.space.xs,
        color: getColor(appTheme.palette.blue, 600),
      }}
    >
      {title}
    </XXL>
    {subtitle && <Paragraph>{subtitle}</Paragraph>}
  </>
);
