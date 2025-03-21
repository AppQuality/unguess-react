import {
  AccordionNew,
  Button,
  FormField,
  Label,
  SM,
  Span,
  Textarea,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { ReactComponent as OutOfScopeIcon } from 'src/assets/icons/x-circle.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { appTheme } from 'src/app/theme';
import { ChangeEvent } from 'react';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import styled from 'styled-components';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

const OutOfScope = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('out_of_scope');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const status = getPlanStatus();

  const validation = (
    module: components['schemas']['Module'] & { type: 'out_of_scope' }
  ) => {
    let error;
    if (module.output.length > 256) {
      error = t('__PLAN_OUT_OF_SCOPE_SIZE_ERROR_TOO_LONG');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'out_of_scope',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setOutput(inputValue);
  };

  const handleSetIconColor = () => {
    if (error) {
      return appTheme.palette.red[900];
    }
    if (value && value.output.length === 0) {
      return appTheme.palette.grey[600];
    }
    return appTheme.palette.blue[600];
  };

  return (
    <AccordionNew
      data-qa="out-of-scope-module"
      level={3}
      hasBorder
      type={error ? 'danger' : 'default'}
    >
      <AccordionNew.Section>
        <AccordionNew.Header
          icon={
            <div
              style={{
                color: handleSetIconColor(),
              }}
            >
              <OutOfScopeIcon />
            </div>
          }
        >
          <AccordionNew.Label
            label={t('__PLAN_PAGE_MODULE_OUT_OF_SCOPE_TITLE')}
          />
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
            getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Button isBasic isDanger onClick={remove}>
                  <Button.StartIcon>
                    <TrashIcon />
                  </Button.StartIcon>
                  {t('__PLAN_PAGE_MODULE_OUT_OF_SCOPE_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <div style={{ padding: appTheme.space.xs }}>
            <FormField style={{ marginBottom: appTheme.space.md }}>
              <Label>
                <Trans i18nKey="__PLAN_PAGE_MODULE_OUT_OF_SCOPE_LABEL">
                  Describe the areas excluded from the activity
                </Trans>
                <Span style={{ color: appTheme.palette.grey[600] }}>
                  (optional)
                </Span>
              </Label>
              <Textarea
                readOnly={getPlanStatus() !== 'draft'}
                data-qa="out-of-scope-input"
                isResizable
                value={value?.output || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                validation={error ? 'error' : undefined}
                placeholder={t('__PLAN_PAGE_MODULE_OUT_OF_SCOPE_PLACEHOLDER')}
              />
              <StyledInfoBox>
                {error && typeof error === 'string' ? (
                  <>
                    <AlertIcon />
                    <SM
                      style={{ color: appTheme.components.text.dangerColor }}
                      data-qa="out-of-scope-error"
                    >
                      {error}
                    </SM>
                  </>
                ) : (
                  <>
                    <InfoIcon />
                    <SM style={{ color: appTheme.palette.grey[600] }}>
                      {t('__PLAN_PAGE_MODULE_OUT_OF_SCOPE_INFO')}
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

export default OutOfScope;
