import {
  AccordionNew,
  FormField as Field,
  Input,
  Label,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useModule } from 'src/features/modules/useModule';

const TargetSize = () => {
  const { value, setOutput, remove } = useModule('target_size');
  const { t } = useTranslation();

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
