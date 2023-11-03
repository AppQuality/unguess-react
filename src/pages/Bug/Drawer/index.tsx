import { Button, Drawer, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  resetCustomStatus,
  setCustomStatusDrawerOpen,
} from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import {
  useDeleteCampaignsByCidCustomStatusesMutation,
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

  const onClose = () => {
    dispatch(setCustomStatusDrawerOpen(false));
    dispatch(resetCustomStatus());
  };

  const onCtaClick = () => {
    dispatch(setCustomStatusDrawerOpen(false));

    // Check all dbCustomStatus ids that are not in the customStatus array
    const deleteCustomStatus = dbCustomStatus?.reduce((acc, cs) => {
      if (cs.is_default) return acc;
      if (!customStatus.find((rcs) => rcs.id === cs.id)) {
        acc.push(cs.id);
      }
      return acc;
    }, [] as number[]);

    // Remove all ids from customStatus objects with is_new = true
    const patchCustomStatus = customStatus.map((cs) => {
      if (cs.is_new) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = cs;
        return rest;
      }
      return cs;
    });

    console.log('patchCustomStatus', patchCustomStatus);
    console.log('deleteCustomStatus', deleteCustomStatus);
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
