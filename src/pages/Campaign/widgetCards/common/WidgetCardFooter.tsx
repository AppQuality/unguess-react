import { SpecialCard } from '@appquality/unguess-design-system';

export const WidgetCardFooter = ({
  children,
  noDivider,
}: {
  children: React.ReactNode;
  noDivider?: boolean;
}) => <SpecialCard.Footer noDivider={noDivider}>{children}</SpecialCard.Footer>;
