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
import { ReactComponent as TargetSizeIcon } from 'src/assets/icons/user-follow.svg';
import { appTheme } from 'src/app/theme';
import { ChangeEvent } from 'react';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';

const TargetSize = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('target');
  const { t } = useTranslation();

  const validation = (
    module: components['schemas']['Module'] & { type: 'target' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_TARGET_SIZE_ERROR_REQUIRED');
    }
    if (module.output < 1) {
      error = t('__PLAN_TARGET_SIZE_ERROR_MIN');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'target',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOutput(Number(e.target.value));
    validate();
  };

  return (
    <AccordionNew level={3} hasBorder>
      <AccordionNew.Section>
        <AccordionNew.Header icon={<TargetSizeIcon />}>
          <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_TARGET_TITLE')} />
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
        <AccordionNew.Panel>
          <FormField style={{ marginBottom: appTheme.space.md }}>
            <Label>
              <Trans i18nKey="__PLAN_PAGE_MODULE_TARGET_LABEL">
                Enter the number of users you want to include
              </Trans>
              <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
            </Label>
            <Input
              type="text"
              value={value?.output || ''}
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
              placeholder={t('__PLAN_PAGE_MODULE_TARGET_PLACEHOLDER')}
            />
            {error && (
              <SM
                style={{ color: appTheme.components.text.dangerColor }}
                data-qa="title-error"
              >
                {error}
              </SM>
            )}
          </FormField>
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

export { TargetSize };
