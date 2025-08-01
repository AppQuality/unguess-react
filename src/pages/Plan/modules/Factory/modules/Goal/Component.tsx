import {
  AccordionNew,
  Button,
  FormField,
  Label,
  SM,
  Span,
  Textarea,
} from '@appquality/unguess-design-system';
import { ChangeEvent, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';
import { useIconWithValidation } from './useIcon';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

const Goal = () => {
  const { value, setOutput, remove } = useModule('goal');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const Icon = useIconWithValidation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };
  return (
    <>
      <AccordionNew
        data-qa="plan_page_module_goal"
        level={3}
        hasBorder
        type={error ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_GOAL_TITLE')} />
            {getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Button
                  isBasic
                  isDanger
                  onClick={(e) => {
                    handleDelete();
                    e.stopPropagation();
                  }}
                >
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
                  minRows={5}
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
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
};

export default Goal;
