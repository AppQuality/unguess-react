import { useState } from 'react';
import { Button, LG, MD, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as MfaEmpty } from 'src/assets/keep-safe.svg';
import styled from 'styled-components';
import { useGetUsersMeQuery } from 'src/features/api';
import { SetupMfaModal } from './SetupMfaModal';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.lg};
`;

export const EmptyStateMFA = ({
  onSetupComplete,
}: {
  onSetupComplete?: () => void;
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: currentUser } = useGetUsersMeQuery();
  const isLegacy = currentUser?.authType === 'legacy';

  return (
    <EmptyStateContainer>
      <LG
        isBold
        style={{
          color: appTheme.palette.grey[700],
          marginBottom: appTheme.space.xxs,
        }}
      >
        {t('__PROFILE_PAGE_MFA_ACCORDION_EMPTY_STATE_LABEL')}
      </LG>
      <MD>{t('__PROFILE_PAGE_MFA_ACCORDION_EMPTY_STATE_DESCRIPTION')}</MD>
      <MfaEmpty />
      {isLegacy ? (
        <Tooltip
          size="large"
          type="light"
          content={t('__PROFILE_PAGE_MFA_ACCORDION_EMPTY_STATE_BUTTON_TOOLTIP')}
        >
          <span
            style={{ marginTop: appTheme.space.sm, display: 'inline-block' }}
          >
            <Button isAccent isPrimary disabled>
              {t('__PROFILE_PAGE_MFA_ACCORDION_EMPTY_STATE_BUTTON_LABEL')}
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Button
          style={{ marginTop: appTheme.space.sm }}
          isAccent
          isPrimary
          onClick={() => setIsModalOpen(true)}
        >
          {t('__PROFILE_PAGE_MFA_ACCORDION_EMPTY_STATE_BUTTON_LABEL')}
        </Button>
      )}
      {isModalOpen && (
        <SetupMfaModal
          onClose={() => {
            setIsModalOpen(false);
            onSetupComplete?.();
          }}
        />
      )}
    </EmptyStateContainer>
  );
};
