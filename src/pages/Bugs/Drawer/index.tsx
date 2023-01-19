import { Button, Drawer } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { setFilterDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';

export const WaterButton = styled(Button)``;

WaterButton.defaultProps = {
  themeColor: globalTheme.palette.water[600],
};

const BugsFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isFilterDrawerOpen } = useAppSelector((state) => state.bugsPage);

  const onClose = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCtaClick = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCancelClick = () => {
    console.log('reset filters');
  };

  return (
    <Drawer isOpen={isFilterDrawerOpen} onClose={onClose} restoreFocus={false}>
      <Drawer.Header>
        {t('__BUGS_PAGE_FILTER_DRAWER_HEADER_TITLE')}
      </Drawer.Header>
      <Drawer.Body>Body</Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button id="" isPill onClick={onCancelClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_CANCEL_BUTTON')}
          </Button>
        </Drawer.FooterItem>
        <Drawer.FooterItem>
          <WaterButton id="" isPrimary isPill onClick={onCtaClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_CONFIRM_BUTTON')}
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="" onClick={onClose} />
    </Drawer>
  );
};

export { BugsFilterDrawer };
