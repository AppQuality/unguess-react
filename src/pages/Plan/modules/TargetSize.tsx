import {
  AccordionNew,
  FormField as Field,
  Input,
  Label,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';

const TargetSize = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('target_size');
  const { t } = useTranslation();

  const validation = (
    module: components['schemas']['Module'] & { type: 'target_size' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_TARGET_SIZE_ERROR_REQUIRED');
    }
    if (typeof module.output !== 'number') {
      error = t('__PLAN_TARGET_SIZE_ERROR_INVALID');
    }
    if (module.output < 1) {
      error = t('__PLAN_TARGET_SIZE_ERROR_MIN');
    }
    if (module.output > 100) {
      error = t('__PLAN_TARGET_SIZE_ERROR_MAX');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'target_size',
    validate: validation,
  });

  return (
    <AccordionNew level={3} id="target-size-module">
      <AccordionNew.Header>
        <AccordionNew.Label label={t('__PLAN_TARGET_SIZE_MODULE_LABEL')} />
      </AccordionNew.Header>
      <AccordionNew.Panel>
        <Field>
          <Label isRegular>{t('__PLAN_TARGET_SIZE_INPUT_LABEL')}</Label>
          <Input />
        </Field>
      </AccordionNew.Panel>
    </AccordionNew>
  );
};

export { TargetSize };
