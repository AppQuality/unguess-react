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
import { ReactComponent as GoalIcon } from 'src/assets/icons/flag-fill.svg';
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

const Goal = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('goal');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const status = getPlanStatus();

  const validation = (
    module: components['schemas']['Module'] & { type: 'goal' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_GOAL_SIZE_ERROR_REQUIRED');
    }
    if (module.output.length < 1) {
      error = t('__PLAN_GOAL_SIZE_ERROR_REQUIRED');
    }
    if (module.output.length > 256) {
      error = t('__PLAN_GOAL_SIZE_ERROR_TOO_LONG');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'goal',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setOutput(inputValue);
  };

  return (
    <AccordionNew
      data-qa="goal-module"
      level={3}
      hasBorder
      type={error ? 'danger' : 'default'}
    >
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
              <GoalIcon />
            </div>
          }
        >
          <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_GOAL_TITLE')} />
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) && (
            <AccordionNew.Meta>
              <Button isBasic isDanger onClick={remove}>
                <Button.StartIcon>
                  <TrashIcon />
                </Button.StartIcon>
                {t('__PLAN_PAGE_MODULE_GOAL_REMOVE_BUTTON')}
              </Button>
            </AccordionNew.Meta>
          )}
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <div style={{ padding: appTheme.space.xs }}>
            <FormField style={{ marginBottom: appTheme.space.md }}>
              <Label>
                <Trans i18nKey="__PLAN_PAGE_MODULE_GOAL_LABEL">
                  Which is the objective of the test?
                </Trans>
                <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
              </Label>
              <Textarea
                readOnly={getPlanStatus() !== 'draft'}
                data-qa="goal-input"
                isResizable
                value={value?.output || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                validation={error ? 'error' : undefined}
                placeholder={t('__PLAN_PAGE_MODULE_GOAL_PLACEHOLDER')}
              />
              <StyledInfoBox>
                {error && typeof error === 'string' ? (
                  <>
                    <AlertIcon />
                    <SM
                      style={{ color: appTheme.components.text.dangerColor }}
                      data-qa="goal-error"
                    >
                      {error}
                    </SM>
                  </>
                ) : (
                  <>
                    <InfoIcon />
                    <SM style={{ color: appTheme.palette.grey[600] }}>
                      {t('__PLAN_PAGE_MODULE_GOAL_INFO')}
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

export default Goal;
