import { MD, SpecialCard } from '@appquality/unguess-design-system';
import { Divider } from 'src/common/components/divider';
import { appTheme } from 'src/app/theme';
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
        <MD isBold style={{ color: appTheme.palette.grey[800] }}>
          <CapitalizeFirstLetter>{title}</CapitalizeFirstLetter>
        </MD>
      )}
      {action}
    </SpecialCard.Meta>
    <Divider />
  </>
);
