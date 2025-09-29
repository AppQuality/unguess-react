import {
  Card,
  Hint,
  IconButton,
  Label,
  Message,
  Paragraph,
  Span,
  Textarea,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';
import { useIconWithValidation } from './useIcon';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.md};
  padding-left: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.lg};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.space.md};
`;

const AdditionalTarget = () => {
  const { value, setOutput, remove } = useModule('additional_target');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const Icon = useIconWithValidation();

  const validation = (
    module: components['schemas']['ModuleAdditionalTarget']
  ) => {
    let error;
    if (module.output.length > 512) {
      error = t('__PLAN_ADDITIONAL_TARGET_ERROR_TOO_LONG');
    }

    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'additional_target',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <StyledCard
        {...(error && {
          style: { border: `1px solid ${appTheme.palette.red[900]}` },
        })}
      >
        <StyledCardHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: appTheme.space.xs,
            }}
          >
            {Icon}
            <Label>{t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TITLE')}</Label>
          </div>
          {getPlanStatus() === 'draft' && (
            <Tooltip
              placement="start"
              type="light"
              size="small"
              content={t(
                '__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_REMOVE_TOOLTIP_BUTTON'
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
          )}
        </StyledCardHeader>
        <>
          <div style={{ display: 'flex', gap: appTheme.space.xxs }}>
            <Label>
              {t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TEXTAREA_LABEL')}
            </Label>
            <Span>{t('__FORM_OPTIONAL_LABEL')}</Span>
          </div>
          <Hint>
            {t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TEXTAREA_DESCRIPTION')}
          </Hint>
          <Textarea
            placeholder={t(
              '__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TEXTAREA_PLACEHOLDER'
            )}
            value={value?.output}
            onChange={(e) => setOutput(e.target.value)}
            onBlur={handleBlur}
            disabled={getPlanStatus() !== 'draft'}
            rows={6}
            {...(error && { validation: 'error' })}
          />
          {error && typeof error === 'string' && (
            <Paragraph style={{ marginTop: appTheme.space.xs }}>
              <Message validation="error" data-qa="additional-target-error">
                {error}
              </Message>
            </Paragraph>
          )}
          <Message>{t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_INFO')}</Message>
        </>
      </StyledCard>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
};

export default AdditionalTarget;
