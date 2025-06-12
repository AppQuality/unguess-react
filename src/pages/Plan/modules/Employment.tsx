import {
  Button,
  ContainerCard,
  Label,
  Message,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { getIconFromModuleType } from '../utils';
import { DeleteModuleConfirmationModal } from './modal/DeleteModuleConfirmationModal';

const StyledCard = styled(ContainerCard)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.md};
  padding-left: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.lg};
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.space.md};
`;

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space.sm};
  gap: ${({ theme }) => theme.space.xxs};
`;

const Employment = () => {
  const { hasFeatureFlag } = useFeatureFlag();
  const { value, setOutput, remove } = useModule('employment');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const validation = (
    module: components['schemas']['Module'] & { type: 'employment' }
  ) => {
    let error;
    if (module.output.length > 512) {
      error = t('__PLAN_EMPLOYMENT_SIZE_ERROR_TOO_LONG');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'employment',
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
      <StyledCard>
        <StyledCardHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: appTheme.space.xs,
            }}
          >
            {getIconFromModuleType('employment')}
            <Label>{t('__PLAN_PAGE_EMPLOYMENT_TITLE')}</Label>
          </div>
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
            getPlanStatus() === 'draft' && (
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
                {t('__PLAN_PAGE_MODULE_EMPLOYMENT_REMOVE_BUTTON')}
              </Button>
            )}
        </StyledCardHeader>
        {getPlanStatus() === 'draft' && (
          <StyledInfoBox>
            {error && typeof error === 'string' ? (
              <Message validation="error" data-qa="employment-note-error">
                {error}
              </Message>
            ) : (
              <Message>{t('__PLAN_PAGE_MODULE_EMPLOYMENT_INFO')}</Message>
            )}
          </StyledInfoBox>
        )}
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

export default Employment;
