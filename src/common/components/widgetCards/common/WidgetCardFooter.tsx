import { SpecialCard } from '@appquality/unguess-design-system';

export const WidgetCardFooter = ({
  className,
  children,
  noDivider,
}: {
  className?: string;
  children: React.ReactNode;
  noDivider?: boolean;
}) => (
  <SpecialCard.Footer className={className} noDivider={noDivider}>
    {children}
  </SpecialCard.Footer>
);
