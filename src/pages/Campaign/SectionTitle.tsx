import { getColor, Paragraph, XXL } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

export const SectionTitle = ({
  id,
  title,
  subtitle,
  children,
}: {
  title: string;
  id?: string;
  subtitle?: string;
  children?: React.ReactNode;
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
      {title} {children}
    </XXL>
    {subtitle && <Paragraph>{subtitle}</Paragraph>}
  </>
);
