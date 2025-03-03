import { Datepicker, Input, Select } from '@appquality/unguess-design-system';
import { useModule } from 'src/features/modules/useModule';
import { formatModuleDate } from './formatModuleDate';
import { addBusinessDays } from 'date-fns';

// validation
const validation = (dates: any) => {
  console.log('dates module', dates);
  let error;
  if (!dates) {
    error = 'Required';
  }
  return error;
};

export const Dates = () => {
  const { value, setOutput } = useModule('dates');

  // get value from module
  const getValue = () => {
    if (!value) return undefined;
    return new Date(value.output.start);
  };

  const handleChange = (date: Date) => {
    setOutput({
      start: date.toISOString(),
    });
  };

  return (
    <div data-qa="dates-module">
      <Select data-qa="dates-variant">
        <Select.Option value="default">Default</Select.Option>
        <Select.Option value="free">Free</Select.Option>
      </Select>
      <Datepicker
        value={getValue()}
        onChange={handleChange}
        formatDate={(date) => formatModuleDate(date).input}
        minValue={addBusinessDays(new Date(), 1)}
      >
        <Input />
      </Datepicker>
    </div>
  );
};
