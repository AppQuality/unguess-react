import { MD, SpecialCard } from '@appquality/unguess-design-system';
import { Divider } from 'src/common/components/divider';
import { CapitalizeFirstLetter } from './CapitalizeFirstLetter';

export const WidgetCardHeader = ({
  title,
  action,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <>
    <SpecialCard.Meta justifyContent="space-between">
      {title && (
        <MD isBold>
          <CapitalizeFirstLetter>{title}</CapitalizeFirstLetter>
        </MD>
      )}
      {action}
    </SpecialCard.Meta>
    <Divider />
  </>
);
