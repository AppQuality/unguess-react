import { ReactComponent as PlusButtonIcon } from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg';
import { ReactComponent as MinusButtonIcon } from '@zendeskgarden/svg-icons/src/16/dash-stroke.svg';
import { IconButton, Input } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

interface PercentageInputProps {
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
}

const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
}) => {
  const handleDecreasePercentage = () => {
    // Logic to decrease percentage
    onChange((prev) => {
      const newValue = prev - 5;
      return newValue < 0 ? 0 : newValue;
    });
  };

  const handleIncreasePercentage = () => {
    // Logic to increase percentage
    onChange((prev) => {
      const newValue = prev + 5;
      return newValue > 100 ? 100 : newValue;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <IconButton
        disabled={value <= 1}
        onClick={(e) => {
          e.stopPropagation();
          // Logic to decrease percentage
          handleDecreasePercentage();
        }}
      >
        <MinusButtonIcon />
      </IconButton>

      <Input
        name="percentage-input"
        isCompact
        max={100}
        min={0}
        placeholder="%"
        type="number"
        value={value}
        onChange={(e) => handleInputChange(e)}
        style={{
          width: '20%',
          height: appTheme.fontSizes.sm,
        }}
      />
      <IconButton
        disabled={value >= 100}
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
