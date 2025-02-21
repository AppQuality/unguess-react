import {
  Button,
  Datepicker,
  FormField,
  Input,
  Select,
  SM,
} from '@appquality/unguess-design-system';
import { isBefore } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import {
  FEATURE_FLAG_CHANGE_MODULES_VARIANTS,
  PLAN_MINIMUM_DATE,
} from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { formatModuleDate } from '../utils/formatModuleDate';

const VariantSelect = () => {
  const { value, setVariant } = useModule('dates');

  const handleVariantChange = (variant: string) => {
    setVariant(variant);
  };

  return (
    <Select
      data-qa="change-variant"
      onSelect={handleVariantChange}
      label="Variant"
      inputValue={value?.variant}
      selectionValue={value?.variant}
    >
      <Select.Option value="default" label="Default" />
      <Select.Option value="free" label="Free" />
    </Select>
  );
};

const RemoveModuleCTA = () => {
  const { remove } = useModule('dates');
  const { t } = useTranslation();

  return <Button onClick={remove}>{t('__PLAN_REMOVE_MODULE_CTA')}</Button>;
};

export const Dates = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput } = useModule('dates');
  const { t } = useTranslation();

  const validation = (
    module: components['schemas']['Module'] & { type: 'dates' }
  ) => {
    let error;
    if (!module.output.start) {
      error = t('__PLAN_DATE_ERROR_REQUIRED');
    }
    if (module.variant === 'default') {
      // is the first date after the second one?
      if (isBefore(new Date(module.output.start), PLAN_MINIMUM_DATE)) {
        error = t('__PLAN_DATE_IN_FUTURE_ERROR');
      }
    }
    return error || true;
  };

  const { error, validate } = useValidation({
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

  const handleBlur = () => {
    validate();
  };

  const getMinValue = () => {
    if (value?.variant === 'default') {
      return PLAN_MINIMUM_DATE;
    }
    return undefined;
  };

  return (
    <div data-qa="dates-module">
      {/* FEATURE FLAG */}
      {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
        <VariantSelect />
      )}
      {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
        <RemoveModuleCTA />
      )}
      <FormField>
        <Datepicker
          value={getValue()}
          onChange={handleChange}
          formatDate={(date) => formatModuleDate(date).input}
          minValue={getMinValue()}
        >
          <Input onBlur={handleBlur} />
        </Datepicker>
      </FormField>
      {error && (
        <SM
          style={{ color: appTheme.components.text.dangerColor }}
          data-qa="dates-error"
        >
          {error}
        </SM>
      )}
    </div>
  );
};
