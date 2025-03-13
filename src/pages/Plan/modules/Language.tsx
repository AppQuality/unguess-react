import {
  AccordionNew,
  Button,
  FormField,
  Input,
  Label,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { ReactComponent as LanguageIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { appTheme } from 'src/app/theme';
import { ChangeEvent } from 'react';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';

const Language = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('language');
  const { t } = useTranslation();

  const validation = (
    module: components['schemas']['Module'] & { type: 'language' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_LANGUAGE_ERROR_REQUIRED');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'language',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setOutput(inputValue);
  };

  return (
    <AccordionNew level={3} hasBorder>
      <AccordionNew.Section>
        <AccordionNew.Header icon={<LanguageIcon />}>
          <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_LANGUAGE_TITLE')} />
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
            <AccordionNew.Meta>
              <Button isBasic isDanger onClick={remove}>
                <Button.StartIcon>
                  <TrashIcon />
                </Button.StartIcon>
                {t('__PLAN_PAGE_MODULE_TARGET_REMOVE_BUTTON')}
              </Button>
            </AccordionNew.Meta>
          )}
        </AccordionNew.Header>
        <AccordionNew.Panel data-qa="title-module">
          <div style={{ padding: appTheme.space.xs }}>
            <FormField style={{ marginBottom: appTheme.space.md }}>
              <Label>
                <Trans i18nKey="__PLAN_PAGE_MODULE_LANGUAGE_LABEL">
                  Enter the number of users you want to include
                </Trans>
                <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
              </Label>
              <Input
                type="number"
                value={value?.output}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                validation={error ? 'error' : undefined}
              />
              {error && typeof error === 'string' && (
                <SM
                  style={{ color: appTheme.components.text.dangerColor }}
                  data-qa="target-error"
                >
                  {error}
                </SM>
              )}
            </FormField>
          </div>
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

export default Language;
