import {
  Datepicker,
  Input,
  Select,
  FormField,
  Button,
} from '@appquality/unguess-design-system';
import { useModule } from 'src/features/modules/useModule';
import { formatModuleDate } from './formatModuleDate';
import { addBusinessDays } from 'date-fns';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useTranslation } from 'react-i18next';

// validation
const validation = (
  value: components['schemas']['Module'] & { type: 'dates' }
) => {
  console.log('dates module', value);
  let error;
  if (!value.output.start) {
    error = 'Required';
  }
  if (value.variant === 'default') {
    if (new Date(value.output.start) < addBusinessDays(new Date(), 1)) {
      error = 'Date must be at least one business day in the future';
    }
  }
  return error || true;
};

export const Dates = () => {
  const { value, setOutput } = useModule('dates');
  const { isValid, error } = useValidation({
    type: 'dates',
    validate: validation,
  });

  const getValue = () => {
    if (!value) return undefined;
    return new Date(value.output.start);
  };

  const handleChange = (date: Date) => {
    setOutput({
      start: formatModuleDate(date).output,
    });
  };

  const getMinValue = () => {
    if (value?.variant === 'default') {
      return addBusinessDays(new Date(), 1);
    }
    return undefined;
  };

  return (
    <div data-qa="dates-module">
      {/* FEATURE FLAG */}
      {FEATURE_FLAG_CHANGE_MODULES_VARIANTS && <VariantSelect />}
      {FEATURE_FLAG_CHANGE_MODULES_VARIANTS && <RemoveModuleCTA />}
      <FormField>
        <Datepicker
          value={getValue()}
          onChange={handleChange}
          formatDate={(date) => formatModuleDate(date).input}
          minValue={getMinValue()}
        >
          <Input />
        </Datepicker>
        {error && <div data-qa="dates-error">{error}</div>}
      </FormField>
    </div>
  );
};

const VariantSelect = () => {
  const { value, setVariant } = useModule('dates');

  const handleVariantChange = (variant: string) => {
    setVariant(variant);
  };

  return (
    <Select
      data-qa="dates-variant"
      onSelect={handleVariantChange}
      label="Variant"
    >
      <Select.Option value="default" isSelected={value?.variant === 'default'}>
        Default
      </Select.Option>
      <Select.Option value="free" isSelected={value?.variant === 'free'}>
        Free
      </Select.Option>
    </Select>
  );
};

const RemoveModuleCTA = () => {
  const { remove } = useModule('dates');
  const { t } = useTranslation();

  return <Button onClick={remove}>{t('__PLAN_REMOVE_MODULE_CTA')}</Button>;
};
