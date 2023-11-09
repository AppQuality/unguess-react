import {
  Button,
  Drawer,
  MD,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  resetCustomStatus,
  setCustomStatusDrawerOpen,
} from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import {
  BugCustomStatus,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidCustomStatusesMutation,
} from 'src/features/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CustomStatusForm } from './CustomStatusForm';
import { CloseDrawerModal } from '../Modals/ClosingDrawerConfirmationModal';
import { MigrationModal } from '../Modals/MigrationModal';

export const CustomStatusDrawer = () => {
  const { campaignId } = useParams();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    isCustomStatusDrawerOpen,
    isCustomStatusDrawerTouched,
    customStatus,
  } = useAppSelector((state) => state.bugsPage);
  const { data: dbCustomStatus } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId?.toString() || '',
  });
  const [patchCustomStatuses] = usePatchCampaignsByCidCustomStatusesMutation();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isMigrationModalOpen, setIsMigrationModalOpen] = useState(false);
  const [deleteCustomStatusState, setDeleteCustomStatusState] = useState<
    BugCustomStatus[]
  >([]);
  const [patchCustomStatusState, setPatchCustomStatusState] = useState<
    (Omit<BugCustomStatus, 'id'> & {
      id?: number;
    })[]
  >([]);

  const onClose = () => {
    if (isCustomStatusDrawerTouched) {
      setIsConfirmationModalOpen(true);
    } else {
      dispatch(setCustomStatusDrawerOpen(false));
      dispatch(resetCustomStatus());
    }
  };

  const onCtaClick = async () => {
    // Check all dbCustomStatus ids that are not in the customStatus array
    const deleteCustomStatus =
      dbCustomStatus?.reduce((acc, cs) => {
        if (cs.is_default) return acc;
        if (!customStatus.find((rcs) => rcs.id === cs.id)) {
          acc.push(cs);
        }
        return acc;
      }, [] as BugCustomStatus[]) ?? [];
    setDeleteCustomStatusState(deleteCustomStatus);

    // Remove all ids from customStatus objects with is_new = true
    const patchCustomStatus = customStatus.map((cs) => {
      if (cs.is_new) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = cs;
        return rest;
      }
      return cs;
    });
    setPatchCustomStatusState(patchCustomStatus);

    // Show migration modal only if there are custom statuses to delete
    if (deleteCustomStatus.length > 0) {
      setIsMigrationModalOpen(true);
      return;
    }

    // Do API call for PATCH (if necessary) and close drawer
    if (patchCustomStatus.length > 0) {
      await patchCustomStatuses({
        cid: campaignId?.toString() || '',
        body: patchCustomStatus,
      });
    }
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="success"
          message={t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CONFIRM_TOAST')}
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
    dispatch(setCustomStatusDrawerOpen(false));
  };

  return (
    <>
      <Drawer isOpen={isCustomStatusDrawerOpen} onClose={onClose}>
        <Drawer.Header>
          {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_HEADER_TITLE')}
        </Drawer.Header>
        <Drawer.Body>
          <MD style={{ marginBottom: appTheme.space.lg }}>
            {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_BODY_DESCRIPTION')}
          </MD>
          <CustomStatusForm />
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.FooterItem>
            <Button id="custom-status-drawer-reset" onClick={onClose} isBasic>
              {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_RESET_BUTTON')}
            </Button>
          </Drawer.FooterItem>
          <Drawer.FooterItem>
            <Button
              id="custom-status-drawer-confirm"
              isPrimary
              isAccent
              onClick={onCtaClick}
            >
              {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CONFIRM_BUTTON')}
            </Button>
          </Drawer.FooterItem>
        </Drawer.Footer>
        <Drawer.Close id="custom-status-drawer-close" onClick={onClose} />
      </Drawer>
      {isCustomStatusDrawerTouched && isConfirmationModalOpen && (
        <CloseDrawerModal
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        />
      )}
      {isMigrationModalOpen && (
        <MigrationModal
          customStatusesToPatch={patchCustomStatusState}
          customStatusesToDelete={deleteCustomStatusState}
          setIsMigrationModalOpen={setIsMigrationModalOpen}
        />
      )}
    </>
  );
};
