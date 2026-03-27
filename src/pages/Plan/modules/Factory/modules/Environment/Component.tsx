import {
  AccordionNew,
  Alert,
  FormField,
  IconButton,
  Input,
  Label,
  SM,
  Span,
  Tooltip,
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
import useWindowSize from 'src/hooks/useWindowSize';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';
import { useIconWithValidation } from './useIcon';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

const Environment = () => {
  const { value, setOutput, remove } = useModule('environment');
  const { t } = useTranslation();
  const { getPlanStatus } = useModuleConfiguration();
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    value?.output
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const Icon = useIconWithValidation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

  useEffect(() => {
    setOutput(currentValue || '');
  }, [currentValue]);

  const validation = (
    module: components['schemas']['Module'] & { type: 'environment' }
  ) => {
    let error;
    if (!module.output || module.output.trim().length === 0) {
      error = t('__PLAN_ENVIRONMENT_ERROR_REQUIRED');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'environment',
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
        data-qa="plan-environment-module"
        level={3}
        hasBorder
        type={error ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_ENVIRONMENT_TITLE')}
            />
            {!isMobile && getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t(
                    '__PLAN_PAGE_MODULE_ENVIRONMENT_REMOVE_TOOLTIP_BUTTON'
                  )}
                >
                  <IconButton
                    isDanger
                    onClick={(e) => {
                      handleDelete();
                      e.stopPropagation();
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              <FormField>
                <Label>
                  <Trans i18nKey="__PLAN_PAGE_MODULE_ENVIRONMENT_LABEL">
                    Specify the product state
                  </Trans>
                  <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
                </Label>
                <Input
                  readOnly={getPlanStatus() !== 'draft'}
                  data-qa="plan-environment-input"
                  type="text"
                  value={currentValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  validation={error ? 'error' : undefined}
                  placeholder={t('__PLAN_PAGE_MODULE_ENVIRONMENT_PLACEHOLDER')}
                />
                <StyledInfoBox>
                  {error && typeof error === 'string' && (
                    <>
                      <AlertIcon />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="plan-environment-error"
                      >
                        {error}
                      </SM>
                    </>
                  )}
                </StyledInfoBox>
                <Alert style={{ marginTop: appTheme.space.sm }} type="info">
                  {t('__PLAN_PAGE_MODULE_ENVIRONMENT_ALERT')}
                </Alert>
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

export default Environment;
