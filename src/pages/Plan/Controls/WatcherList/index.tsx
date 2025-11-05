import {
  Alert,
  Anchor,
  Button,
  MD,
  Skeleton,
  Tooltip,
  TooltipModal,
} from '@appquality/unguess-design-system';

import { useRef, useState } from 'react';
import { Divider } from 'src/common/components/divider';
import { styled, useTheme } from 'styled-components';

import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as EyeIconFill } from 'src/assets/icons/eye-icon-fill.svg';
import { ReactComponent as EyeIcon } from 'src/assets/icons/eye-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { useGetPlansByPidWatchersQuery } from 'src/features/api';
import { usePlanIsApproved } from 'src/hooks/usePlan';
import { useIsWatching } from './hooks/useIsWatching';
import { MemberAddAutocomplete } from './MemberAddAutoComplete';
import { UserList } from './UserList';
import { WatchButton } from './WatchButton';

const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  .title-with-icon {
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.space.xs};
  }
`;

const WatcherList = ({ planId }: { planId: string }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const appTheme = useTheme();
  const isWatching = useIsWatching({ planId });
  const { data: watchers, isLoading } = useGetPlansByPidWatchersQuery({
    pid: planId,
  });
  const watchersCount = watchers ? watchers.items.length : 0;

  const isApproved = usePlanIsApproved(planId);

  return (
    <>
      <Tooltip
        placement="bottom-end"
        type="light"
        size="large"
        content={
          <>
            <MD isBold style={{ marginBottom: appTheme.space.xs }}>
              {t('__PLAN_PAGE_WATCHER_LIST_TOOLTIP')}
            </MD>
            <MD>{t('__PLAN_PAGE_WATCHER_LIST_TOOLTIP_DESCRIPTION')}</MD>
          </>
        }
      >
        <Button
          isBasic
          ref={ref}
          size="small"
          onClick={() => setReferenceElement(ref.current)}
        >
          {isLoading ? (
            <Skeleton width="50px" height="50px" />
          ) : (
            <div
              style={{
                display: 'flex',
                gap: appTheme.space.xs,
                alignItems: 'center',
              }}
            >
              {isWatching ? (
                <>
                  <EyeIconFill /> ({watchersCount})
                </>
              ) : (
                <>
                  <EyeIcon /> ({watchersCount})
                </>
              )}
            </div>
          )}
        </Button>
      </Tooltip>
      <TooltipModal
        referenceElement={referenceElement}
        placement="auto"
        hasArrow={false}
        onClose={() => setReferenceElement(null)}
        role="dialog"
      >
        <TooltipModal.Title>
          <MD isBold style={{ marginBottom: appTheme.space.xs }}>
            {t('__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE')}
          </MD>
        </TooltipModal.Title>
        <TooltipModal.Body style={{ maxHeight: '332px', overflowY: 'auto' }}>
          <ModalBodyContainer>
            <MD>
              {isApproved ? (
                t('__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE_DESCRIPTION_APPROVED')
              ) : (
                <Trans
                  i18nKey="__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE_DESCRIPTION"
                  components={{
                    span: (
                      <Anchor
                        href="/profile"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                />
              )}
            </MD>
            {isApproved && (
              <Alert type="info">
                <Alert.Title style={{ marginBottom: appTheme.space.xxs }}>
                  {t('__PLAN_PAGE_WATCHER_LIST_APPROVED_ALERT_TITLE')}
                </Alert.Title>
                {t('__PLAN_PAGE_WATCHER_LIST_APPROVED_ALERT_TEXT')}
              </Alert>
            )}
            {!isApproved && <WatchButton planId={planId} />}
            <Divider />
            <UserList planId={planId} />
          </ModalBodyContainer>
        </TooltipModal.Body>
        <TooltipModal.Body>
          {!isApproved && (
            <DropdownContainer>
              <div className="title-with-icon">
                <MD isBold>
                  {t('__PLAN_PAGE_WATCHER_LIST_MODAL_SUGGESTIONS_TITLE')}
                </MD>
                <Tooltip
                  placement="top"
                  type="light"
                  size="medium"
                  content={t(
                    '__PLAN_PAGE_WATCHER_LIST_MODAL_ADD_MEMBERS_INFO_TOOLTIP'
                  )}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InfoIcon />
                  </div>
                </Tooltip>
              </div>
              <MemberAddAutocomplete planId={planId} />
            </DropdownContainer>
          )}
        </TooltipModal.Body>
      </TooltipModal>
    </>
  );
};

export { WatcherList };
