import { ColorSwatch } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { forwardRef } from 'react';

const colorsArray: {
  label?: string;
  value: string;
}[] = [
  { value: appTheme.palette.grey[400] },
  { value: appTheme.palette.azure[500] },
  { value: appTheme.palette.yellow[500] },
  { value: appTheme.palette.red[500] },
  { value: appTheme.palette.fuschia[600] },
  { value: appTheme.palette.purple[500] },
  { value: appTheme.palette.royal[700] },
];

interface ColorPickerProps {
  onSelect?: (color: string) => void;
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ onSelect }, ref) => (
    <div style={{ zIndex: 2 }}>
      <ColorSwatch colors={colorsArray} onSelect={onSelect} disableTooltip>
        <div ref={ref} />
      </ColorSwatch>
    </div>
  )
);
