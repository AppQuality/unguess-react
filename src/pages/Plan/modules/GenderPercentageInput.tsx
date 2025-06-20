import { ReactComponent as PlusButtonIcon } from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg';
import { ReactComponent as MinusButtonIcon } from '@zendeskgarden/svg-icons/src/16/dash-stroke.svg';
import { IconButton, Input } from '@appquality/unguess-design-system';
import { useState } from 'react';

interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  gender: string;
  planStatus: string;
}

const PercentageInput = ({
  value,
  onChange,
  gender,
  readOnly = false,
  planStatus = 'draft',
}: PercentageInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const handleDecreasePercentage = () => {
    // Logic to decrease percentage
    const newValue = value - 10;
    onChange(newValue < 0 ? 0 : newValue);
  };

  const handleIncreasePercentage = () => {
    // Logic to increase percentage
    const newValue = value + 10;
    onChange(newValue > 100 ? 100 : newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (Number.isNaN(newValue)) return;
    setInternalValue(newValue);
  };

  const handleBlur = () => {
    onChange(internalValue);
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
        size="small"
        disabled={value <= 0 || readOnly || planStatus !== 'draft'}
        onClick={(e) => {
          e.stopPropagation();
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
        value={internalValue}
        disabled={readOnly || planStatus !== 'draft'}
        onChange={handleInputChange}
        onBlur={handleBlur}
        style={{
          width: '50px',
        }}
      />
      <IconButton
        size="small"
        disabled={value >= 100 || readOnly || planStatus !== 'draft'}
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
