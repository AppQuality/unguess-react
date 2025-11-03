import {
  Alert,
  Button,
  MD,
  Skeleton,
  TooltipModal,
} from '@appquality/unguess-design-system';

import { useRef, useState } from 'react';
import { Divider } from 'src/common/components/divider';
import { styled, useTheme } from 'styled-components';

import { useTranslation } from 'react-i18next';
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
      <Button
        isBasic
        ref={ref}
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
      <TooltipModal
        referenceElement={referenceElement}
        placement="auto"
        hasArrow={false}
        onClose={() => setReferenceElement(null)}
        role="dialog"
      >
        <TooltipModal.Title>
          <MD isBold style={{ marginBottom: appTheme.space.xs }}>
            {t(
              '__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE',
              'Stay updated on setup progress'
            )}
          </MD>
        </TooltipModal.Title>
        <TooltipModal.Body style={{ maxHeight: '332px', overflowY: 'auto' }}>
          <ModalBodyContainer>
            <MD>
              {isApproved
                ? t(
                    '__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE_DESCRIPTION_APPROVED',
                    'Activity setup is complete'
                  )
                : t(
                    '__PLAN_PAGE_WATCHER_LIST_MODAL_TITLE_DESCRIPTION',
                    'Follow this activity and turn on notifications to receive important email updates about changes'
                  )}
            </MD>
            {isApproved && (
              <Alert type="info">
                <Alert.Title style={{ marginBottom: appTheme.space.xxs }}>
                  {t('__PLAN_PAGE_WATCHER_LIST_APPROVED_ALERT_TITLE', 'Info')}
                </Alert.Title>
                {t(
                  '__PLAN_PAGE_WATCHER_LIST_APPROVED_ALERT_TEXT',
                  'Future notifications will relate to execution. Add or remove followers from the dashboard'
                )}
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
                  {t(
                    '__PLAN_PAGE_WATCHER_LIST_MODAL_SUGGESTIONS_TITLE',
                    'Add workspace members'
                  )}
                </MD>
                <InfoIcon />
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
