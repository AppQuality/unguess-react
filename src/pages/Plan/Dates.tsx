import { Datepicker, Input } from '@appquality/unguess-design-system';
import { useModuleContext } from 'src/features/modules/ModuleWrapper';
import { formatModuleDate } from './formatModuleDate';

export const Dates = () => {
  const { value, set, remove } = useModuleContext('dates');

  // get value from module
  const getValue = () => {
    if (!value) return undefined;
    return new Date(value.output.start);
  };

  const handleChange = (date: Date) => {
    // todo
  };

  return (
    <div data-qa="dates-module">
      <Datepicker
        value={getValue()}
        onChange={handleChange}
        formatDate={(date) => formatModuleDate(date).input}
      >
        <Input />
      </Datepicker>
    </div>
  );
};
