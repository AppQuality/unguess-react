import { Paragraph, theme, XL } from '@appquality/unguess-design-system';

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
    <XL
      id={id}
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
