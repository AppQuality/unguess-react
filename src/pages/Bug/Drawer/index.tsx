import { Button, Drawer, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  resetCustomStatus,
  setCustomStatusDrawerOpen,
} from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import { CustomStatusForm } from './CustomStatusForm';

export const CustomStatusDrawer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isCustomStatusDrawerOpen } = useAppSelector(
    (state) => state.bugsPage
  );

  const onClose = () => {
    dispatch(setCustomStatusDrawerOpen(false));
    dispatch(resetCustomStatus());
  };

  const onCtaClick = () => {
    dispatch(setCustomStatusDrawerOpen(false));
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
