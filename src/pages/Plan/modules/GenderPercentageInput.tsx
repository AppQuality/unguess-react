import { IconButton, Input } from '@appquality/unguess-design-system';
import { ReactComponent as MinusButtonIcon } from '@zendeskgarden/svg-icons/src/16/dash-stroke.svg';
import { ReactComponent as PlusButtonIcon } from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg';
import { useState } from 'react';

interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  gender: string;
  planStatus: string;
}

const PercentageInput = ({
  value,
  onChange,
  gender,
  readOnly = false,
  disabled = false,
  planStatus = 'draft',
}: PercentageInputProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChangePercentage = (change: number) => {
    let newValue = value + change;
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    onChange(newValue);
    setInternalValue(newValue);
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
        isPill={false}
        disabled={
          internalValue <= 0 || disabled || readOnly || planStatus !== 'draft'
        }
        onClick={(e) => {
          e.stopPropagation();
          handleChangePercentage(-10);
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
        disabled={disabled || (planStatus !== 'draft' && internalValue === 0)}
        readOnly={readOnly || (planStatus !== 'draft' && internalValue !== 0)}
        onChange={handleInputChange}
        onBlur={handleBlur}
        style={{
          width: '50px',
        }}
      />
      <IconButton
        size="small"
        isPill={false}
        disabled={
          internalValue >= 100 || readOnly || disabled || planStatus !== 'draft'
        }
        onClick={(e) => {
          e.stopPropagation();
          handleChangePercentage(10);
        }}
      >
        <PlusButtonIcon />
      </IconButton>
    </div>
  );
};

export default PercentageInput;
