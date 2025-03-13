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
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { appTheme } from 'src/app/theme';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import styled from 'styled-components';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

const TargetSize = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('target');
  const { t } = useTranslation();
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    value?.output.toString()
  );
  useEffect(() => {
    setOutput(Number(currentValue));
  }, [currentValue]);
  const validation = (
    module: components['schemas']['Module'] & { type: 'target' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_TARGET_SIZE_ERROR_REQUIRED');
    }
    if (module.output < 1) {
      error = t('__PLAN_TARGET_SIZE_ERROR_REQUIRED');
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
    const inputValue = e.target.value;
    setCurrentValue(inputValue);
  };

  return (
    <AccordionNew level={3} hasBorder type={error ? 'danger' : 'default'}>
      <AccordionNew.Section>
        <AccordionNew.Header
          icon={
            <div
              style={{
                color: error
                  ? appTheme.palette.red[900]
                  : appTheme.palette.blue[600],
              }}
            >
              <TargetSizeIcon />
            </div>
          }
        >
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
        <AccordionNew.Panel data-qa="title-module">
          <div style={{ padding: appTheme.space.xs }}>
            <FormField style={{ marginBottom: appTheme.space.md }}>
              <Label>
                <Trans i18nKey="__PLAN_PAGE_MODULE_TARGET_LABEL">
                  Enter the number of users you want to include
                </Trans>
                <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
              </Label>
              <Input
                type="number"
                value={currentValue}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                validation={error ? 'error' : undefined}
                placeholder={t('__PLAN_PAGE_MODULE_TARGET_PLACEHOLDER')}
              />
              <StyledInfoBox>
                {error && typeof error === 'string' ? (
                  <>
                    <AlertIcon />
                    <SM
                      style={{ color: appTheme.components.text.dangerColor }}
                      data-qa="target-error"
                    >
                      {error}
                    </SM>
                  </>
                ) : (
                  <>
                    <InfoIcon />
                    <SM style={{ color: appTheme.palette.grey[600] }}>
                      {t('__PLAN_PAGE_MODULE_TARGET_INFO')}
                    </SM>
                  </>
                )}
              </StyledInfoBox>
            </FormField>
          </div>
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};

export default TargetSize;
