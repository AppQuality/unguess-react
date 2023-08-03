import { Paragraph, theme, XXL } from '@appquality/unguess-design-system';

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
        fontWeight: theme.fontWeights.medium,
        marginBottom: theme.space.xs,
      }}
    >
      {title}
    </XXL>
    {subtitle && <Paragraph>{subtitle}</Paragraph>}
  </>
);
