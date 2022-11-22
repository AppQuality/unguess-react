import { Paragraph, theme, XL } from '@appquality/unguess-design-system';

export const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <>
    <XL
      style={{
        fontWeight: theme.fontWeights.medium,
        marginBottom: theme.space.xs,
      }}
    >
      {title}
    </XL>
    {subtitle && <Paragraph>{subtitle}</Paragraph>}
  </>
);
