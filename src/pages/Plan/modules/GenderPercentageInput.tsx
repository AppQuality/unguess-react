import { ReactComponent as PlusButtonIcon } from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg';
import { ReactComponent as MinusButtonIcon } from '@zendeskgarden/svg-icons/src/16/dash-stroke.svg';
import { IconButton, Input } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  gender: string;
}

const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  gender,
  readOnly = false,
}) => {
  const handleDecreasePercentage = () => {
    // Logic to decrease percentage
    const newValue = value - 5;
    onChange(newValue < 0 ? 0 : newValue);
  };

  const handleIncreasePercentage = () => {
    // Logic to increase percentage
    const newValue = value + 5;
    onChange(newValue > 100 ? 100 : newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (Number.isNaN(newValue)) return;
    onChange(Math.max(0, Math.min(100, newValue)));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <IconButton
        disabled={value <= 0 || readOnly}
        onClick={(e) => {
          e.stopPropagation();
          // Logic to decrease percentage
          handleDecreasePercentage();
        }}
      >
        <MinusButtonIcon />
      </IconButton>
      <Input
        name={`${gender}-percentage-input`}
        isCompact
        max={100}
        min={0}
        placeholder="%"
        type="number"
        value={value}
        readOnly={readOnly}
        onChange={(e) => handleInputChange(e)}
        style={{
          width: '20%',
          height: appTheme.fontSizes.sm,
        }}
      />
      <IconButton
        disabled={value >= 100 || readOnly}
        onClick={(e) => {
          e.stopPropagation();
          handleIncreasePercentage();
        }}
      >
        <PlusButtonIcon />
      </IconButton>
    </div>
  );
};

export default PercentageInput;
