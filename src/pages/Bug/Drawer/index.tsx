import { Button, Drawer } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  resetCustomStatus,
  setCustomStatusDrawerOpen,
  updateCustomStatus,
} from 'src/features/bugsPage/bugsPageSlice';

export const CustomStatusDrawer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isCustomStatusDrawerOpen, customStatus } = useAppSelector(
    (state) => ({
      isCustomStatusDrawerOpen: state.bugsPage.isCustomStatusDrawerOpen,
      customStatus: state.bugsPage.customStatus,
    })
  );

  const onClose = () => {
    dispatch(setCustomStatusDrawerOpen(false));
  };

  const onCtaClick = () => {
    dispatch(updateCustomStatus(customStatus));
    dispatch(setCustomStatusDrawerOpen(false));
  };

  const onResetClick = () => {
    dispatch(resetCustomStatus());
  };

  return (
    <Drawer isOpen={isCustomStatusDrawerOpen} onClose={onClose}>
      <Drawer.Header>
        {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_HEADER_TITLE')}
      </Drawer.Header>
      <Drawer.Body>custom status</Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button id="custom-status-drawer-reset" onClick={onResetClick}>
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
