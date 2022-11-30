import {
  MD,
  SpecialCard,
  theme as ugTheme,
} from '@appquality/unguess-design-system';
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
        <MD isBold style={{ color: ugTheme.palette.grey[800] }}>
          <CapitalizeFirstLetter>{title}</CapitalizeFirstLetter>
        </MD>
      )}
      {action}
    </SpecialCard.Meta>
    <Divider />
  </>
);
