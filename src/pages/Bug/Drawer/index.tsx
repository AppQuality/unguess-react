import { Button, Drawer, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  resetCustomStatus,
  setCustomStatusDrawerOpen,
} from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import {
  BugCustomStatus,
  useDeleteCampaignsByCidCustomStatusesMutation,
  useGetCampaignsByCidBugsQuery,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidCustomStatusesMutation,
} from 'src/features/api';
import { useParams } from 'react-router-dom';
import { CustomStatusForm } from './CustomStatusForm';

export const CustomStatusDrawer = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isCustomStatusDrawerOpen, customStatus } = useAppSelector(
    (state) => state.bugsPage
  );
  const { data: dbCustomStatus } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId?.toString() || '',
  });
  const [patchCustomStatuses] = usePatchCampaignsByCidCustomStatusesMutation();
  const [deleteCustomStatuses] =
    useDeleteCampaignsByCidCustomStatusesMutation();
  const { data: bugs } = useGetCampaignsByCidBugsQuery({
    cid: campaignId?.toString() || '',
  });

  const onClose = () => {
    dispatch(setCustomStatusDrawerOpen(false));
    dispatch(resetCustomStatus());
  };

  const onCtaClick = () => {
    dispatch(setCustomStatusDrawerOpen(false));

    // Check all dbCustomStatus ids that are not in the customStatus array
    const deleteCustomStatus =
      dbCustomStatus?.reduce((acc, cs) => {
        if (cs.is_default) return acc;
        if (!customStatus.find((rcs) => rcs.id === cs.id)) {
          acc.push(cs);
        }
        return acc;
      }, [] as BugCustomStatus[]) ?? [];

    // Remove all ids from customStatus objects with is_new = true
    const patchCustomStatus = customStatus.map((cs) => {
      if (cs.is_new) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = cs;
        return rest;
      }
      return cs;
    });

    // Check if deleteCustomStatus is used in bugs and create an array of them
    const deleteCustomStatusUsed =
      deleteCustomStatus?.filter((cs) =>
        bugs?.items?.find((b) => b.custom_status.id === cs.id)
      ) ?? [];

    // Create an array of customStatus ids that are not used in bugs
    const deleteCustomStatusUnused =
      deleteCustomStatus?.filter(
        (cs) => !deleteCustomStatusUsed.find((dcs) => dcs.id === cs.id)
      ) ?? [];

    console.log('patchCustomStatus', patchCustomStatus);
    console.log('deleteCustomStatus', deleteCustomStatus);
    console.log('deleteCustomStatusUsed', deleteCustomStatusUsed);
    console.log('deleteCustomStatusUnused', deleteCustomStatusUnused);

    // TODO: Move these API calls to delete modal

    // if (patchCustomStatus.length > 0)
    //   patchCustomStatuses({
    //     cid: campaignId?.toString() || '',
    //     body: patchCustomStatus,
    //   });

    // if (deleteCustomStatus.length > 0)
    //   deleteCustomStatuses({
    //     cid: campaignId?.toString() || '',
    //     body: [
    //       ...deleteCustomStatusUnused.map((cs) => ({
    //         custom_status_id: cs.id,
    //       })),
    //       ...deleteCustomStatusUsed.map((cs) => ({
    //         custom_status_id: cs.id,
    //         // to_custom_status_id
    //       })),
    //     ],
    //   });
  };

  return (
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
  );
};
