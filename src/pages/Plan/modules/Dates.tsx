import {
  Datepicker,
  FormField,
  Input,
  Message,
} from '@appquality/unguess-design-system';
import { isBefore } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { PLAN_MINIMUM_DATE } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { formatModuleDate } from '../utils/formatModuleDate';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

export const Dates = () => {
  const { value, setOutput, remove } = useModule('dates');
  const { t } = useTranslation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const validation = (
    module: components['schemas']['Module'] & { type: 'dates' }
  ) => {
    if (!module.output.start) {
      return { start: t('__PLAN_DATE_ERROR_REQUIRED') };
    }
    if (isBefore(new Date(module.output.start), PLAN_MINIMUM_DATE)) {
      return { start: t('__PLAN_DATE_IN_FUTURE_ERROR') };
    }
    return true;
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

  const datesError =
    error && typeof error === 'object' && `dates.start` in error
      ? error[`dates.start`]
      : false;

  /*   useEffect(() => {
    validate();
  }, []); */

  return (
    <div data-qa="dates-module">
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
      {datesError && (
        <Message
          validation="error"
          data-qa="dates-error"
          style={{ marginTop: appTheme.space.sm }}
        >
          {datesError}
        </Message>
      )}
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </div>
  );
};
