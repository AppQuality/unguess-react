import {
  Button,
  ContainerCard,
  MD,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { FEATURE_FLAG_CHANGE_MODULES_VARIANTS } from 'src/constants';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';
import { useIconWithValidation } from '../../useIcon';
import { useModuleTouchpoints } from '../hooks';
import { AddTouchpointButton } from './AddTouchpointButton';
import { TouchpointsModal } from './modal';
import { TouchpointItem } from './TouchpointItem';

const StyledCard = styled(ContainerCard)`
  background-color: transparent;
  padding: 0;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TouchpointsContainer = styled.div`
  padding: 0 ${({ theme }) => theme.space.xs};
`;

const HeaderContainer = styled.div<{
  hasErrors?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ hasErrors, theme }) =>
    hasErrors ? theme.palette.red[100] : theme.palette.blue[100]};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const TouchpointsList = () => {
  const { value, error } = useModuleTouchpoints();
  const { remove } = useModule('touchpoints');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const Icon = useIconWithValidation();

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  const errorEmpty =
    error && typeof error === 'object' && `touchpoints.empty` in error
      ? error[`touchpoints.empty`]
      : false;

  return (
    <>
      <StyledCard
        data-qa="touchpoints-module"
        {...(error && { style: { borderColor: appTheme.palette.red[900] } })}
      >
        <HeaderContainer hasErrors={!!error}>
          <TitleContainer>
            {Icon}
            <MD isBold style={{ color: appTheme.palette.blue[600] }}>
              {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TITLE')}
            </MD>
          </TitleContainer>
          {hasFeatureFlag(FEATURE_FLAG_CHANGE_MODULES_VARIANTS) &&
            getPlanStatus() === 'draft' && (
              <Button
                isBasic
                isDanger
                size="small"
                onClick={(e) => {
                  handleDelete();
                  e.stopPropagation();
                }}
              >
                {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_REMOVE_BUTTON')}
              </Button>
            )}
        </HeaderContainer>
        <div style={{ padding: appTheme.space.md }}>
          <MD isBold style={{ color: appTheme.palette.grey[800] }}>
            {t('__PLAN_PAGE_MODULE_TOUCHPOINTS_SUBTITLE')}
            <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
          </MD>
          {error &&
            (errorEmpty ? (
              <Message
                validation="error"
                style={{ marginTop: appTheme.space.md }}
              >
                {errorEmpty}
              </Message>
            ) : (
              <Message
                validation="error"
                style={{ marginTop: appTheme.space.md }}
              >
                {t('__PLAN_PAGE_MODULE_TASKS_GENERIC_ERROR')}
              </Message>
            ))}
        </div>
        <TouchpointsContainer>
          {value.map((touchpoint) => (
            <TouchpointItem key={touchpoint.key} touchpoint={touchpoint} />
          ))}
        </TouchpointsContainer>
        {getPlanStatus() === 'draft' && <AddTouchpointButton />}
        <TouchpointsModal />
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

export { TouchpointsList };
