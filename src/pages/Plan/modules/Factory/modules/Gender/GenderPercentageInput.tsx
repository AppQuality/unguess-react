import { IconButton, Input } from '@appquality/unguess-design-system';
import { ReactComponent as MinusButtonIcon } from '@zendeskgarden/svg-icons/src/16/dash-stroke.svg';
import { ReactComponent as PlusButtonIcon } from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg';
import { useModule } from 'src/features/modules/useModule';

interface PercentageInputProps {
  value: number;
  readOnly?: boolean;
  disabled?: boolean;
  gender: 'male' | 'female';
  planStatus: string;
}

const PercentageInput = ({
  value,
  gender,
  readOnly = false,
  disabled = false,
  planStatus = 'draft',
}: PercentageInputProps) => {
  const { value: moduleValue, setOutput } = useModule('gender');

  const handleChangePercentage = (newValue: number) => {
    let updatedValue = newValue;
    if (newValue < 0) updatedValue = 0;
    if (newValue > 100) updatedValue = 100;

    const updatedOutput = (moduleValue?.output ?? []).map((g) => {
      if (g.gender === gender) {
        return { ...g, percentage: updatedValue };
      }
      return g;
    });
    setOutput(updatedOutput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (Number.isNaN(newValue)) return;
    handleChangePercentage(newValue);
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
        disabled={value <= 0 || disabled || readOnly || planStatus !== 'draft'}
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
        value={value}
        disabled={disabled || (planStatus !== 'draft' && value === 0)}
        readOnly={readOnly || (planStatus !== 'draft' && value !== 0)}
        onChange={handleInputChange}
        style={{
          width: '50px',
        }}
      />
      <IconButton
        size="small"
        isPill={false}
        disabled={
          value >= 100 || readOnly || disabled || planStatus !== 'draft'
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
