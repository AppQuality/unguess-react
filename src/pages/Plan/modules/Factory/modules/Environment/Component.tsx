import {
  AccordionNew,
  FormField,
  IconButton,
  Label,
  Select,
  SM,
  Span,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
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

type EnvType = 'production' | 'staging' | 'prototype' | 'other' | 'app-beta';

const Environment = () => {
  const { value, setOutput, remove } = useModule('environment');
  const { t } = useTranslation();
  const { getPlanStatus } = useModuleConfiguration();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const Icon = useIconWithValidation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

  const options: Array<{ value: EnvType; label: string }> = [
    {
      value: 'production',
      label: t('__PLAN_PAGE_MODULE_ENVIRONMENT_OPTION_PRODUCTION'),
    },
    {
      value: 'staging',
      label: t('__PLAN_PAGE_MODULE_ENVIRONMENT_OPTION_STAGING'),
    },
    {
      value: 'prototype',
      label: t('__PLAN_PAGE_MODULE_ENVIRONMENT_OPTION_PROTOTYPE'),
    },
    {
      value: 'other',
      label: t('__PLAN_PAGE_MODULE_ENVIRONMENT_OPTION_OTHER'),
    },
    {
      value: 'app-beta',
      label: t('__PLAN_PAGE_MODULE_ENVIRONMENT_OPTION_APP_BETA'),
    },
  ];

  const validation = (
    module: components['schemas']['Module'] & { type: 'environment' }
  ) => {
    let error;
    if (!module.output?.envType) {
      error = t('__PLAN_ENVIRONMENT_ERROR_REQUIRED');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'environment',
    validate: validation,
  });

  const handleChange = (item: EnvType) => {
    setOutput({ envType: item });
    validate();
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <AccordionNew
        data-qa="environment-module"
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
                    Select the product environment type
                  </Trans>
                  <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
                </Label>
                <Select
                  isDisabled={getPlanStatus() !== 'draft'}
                  data-qa="environments-select"
                  isCompact
                  inputValue={value?.output?.envType || ''}
                  selectionValue={value?.output?.envType || ''}
                  renderValue={() => {
                    const selected = options.find(
                      (opt) => opt.value === value?.output?.envType
                    );
                    return (
                      selected?.label ||
                      t('__PLAN_PAGE_MODULE_ENVIRONMENT_SELECT_PLACEHOLDER')
                    );
                  }}
                  onSelect={(item) => handleChange(item as EnvType)}
                  validation={error ? 'error' : undefined}
                >
                  {options.map((option) => (
                    <Select.Option
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </Select>
                <StyledInfoBox>
                  {error && typeof error === 'string' && (
                    <>
                      <AlertIcon />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="environments-error"
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

export default Environment;
