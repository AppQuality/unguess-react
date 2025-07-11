import {
  AccordionNew,
  Button,
  FormField,
  Input,
  Label,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { ChangeEvent, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
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

const TargetSize = () => {
  const { value, setOutput, remove } = useModule('target');
  const { t } = useTranslation();
  const { getPlanStatus } = useModuleConfiguration();
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    value?.output.toString()
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const Icon = useIconWithValidation();

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

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <AccordionNew
        data-qa="target-module"
        level={3}
        hasBorder
        type={error ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_TARGET_TITLE')} />
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
                  {t('__PLAN_PAGE_MODULE_TARGET_REMOVE_BUTTON')}
                </Button>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              <FormField>
                <Label>
                  <Trans i18nKey="__PLAN_PAGE_MODULE_TARGET_LABEL">
                    Enter the number of users you want to include
                  </Trans>
                  <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
                </Label>
                <Input
                  readOnly={getPlanStatus() !== 'draft'}
                  data-qa="target-input"
                  type="number"
                  value={currentValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  validation={error ? 'error' : undefined}
                  placeholder={t('__PLAN_PAGE_MODULE_TARGET_PLACEHOLDER')}
                />
                <StyledInfoBox>
                  {error && typeof error === 'string' && (
                    <>
                      <AlertIcon />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="target-error"
                      >
                        {error}
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

export default TargetSize;
