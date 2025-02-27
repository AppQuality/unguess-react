import {
  Datepicker,
  Input,
  Label,
  Select,
} from '@appquality/unguess-design-system';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';
import { formatModuleDate } from './formatModuleDate';
import { Field } from 'formik';
import { addBusinessDays } from 'date-fns';

export const Dates = () => {
  const { value, set, remove } = useModuleContext('dates');

  // get value from module
  const getValue = () => {
    if (!value) return undefined;
    return new Date(value.output.start);
  };

  // validation
  const validation = (dates: Date) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  };

  const handleChange = (date: Date) => {
    // todo
  };

  return (
    <Field name="dates" validate={validation} data-qa="dates-module">
      <Label>Date</Label>
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
    </Field>
  );
};
