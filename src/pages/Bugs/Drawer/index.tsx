import {
  Button,
  Drawer,
  MD,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import {
  getCurrentCampaignData,
  resetFilters,
  setFilterDrawerOpen,
} from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { DeviceField } from './DeviceField';
import { OsField } from './OsField';
import { ReplicabilityField } from './ReplicabilityField';
import { SeverityField } from './SeverityField';
import { TagField } from './TagField';
import { TypeField } from './TypeField';
import { UniqueField } from './UniqueField';
import { UseCaseField } from './UseCaseField';

export const WaterButton = styled(Button)``;

WaterButton.defaultProps = {
  themeColor: globalTheme.palette.water[600],
};

const BugsFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isFilterDrawerOpen = useAppSelector(
    (state) => state.bugsPage.isFilterDrawerOpen
  );
  const campaignData = getCurrentCampaignData();

  if (!campaignData) return <Skeleton />;

  const onClose = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCtaClick = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onResetClick = () => {
    dispatch(resetFilters());
  };

  const {
    types,
    severities,
    unique,
    tags,
    useCases,
    devices,
    os,
    replicabilities,
  } = campaignData;

  const memoizedFilters = useMemo(
    () => (
      <>
        <MD
          isBold
          style={{
            color: globalTheme.palette.grey[600],
            marginBottom: globalTheme.space.sm,
          }}
        >
          {t('__BUGS_PAGE_FILTER_DRAWER_BODY_COMMON_LABEL')}
        </MD>
        {unique.available.length && <UniqueField unique={unique} />}
        {severities.available.length && (
          <SeverityField severities={severities} />
        )}
        {types.available.length && <TypeField types={types} />}
        {useCases.available.length && <UseCaseField useCases={useCases} />}
        <MD
          isBold
          style={{
            color: globalTheme.palette.grey[600],
            marginBottom: globalTheme.space.sm,
            marginTop: globalTheme.space.md,
          }}
        >
          {t('__BUGS_PAGE_FILTER_DRAWER_BODY_ACTIONS_LABEL')}
        </MD>
        <TagField tags={tags} />
        <MD
          isBold
          style={{
            color: globalTheme.palette.grey[600],
            marginBottom: globalTheme.space.sm,
            marginTop: globalTheme.space.md,
          }}
        >
          {t('__BUGS_PAGE_FILTER_DRAWER_BODY_BUG_LABEL')}
        </MD>
        {replicabilities.available.length && (
          <ReplicabilityField replicabilities={replicabilities} />
        )}
        {devices.available.length && <DeviceField devices={devices} />}
        {os.available.length && <OsField os={os} />}
      </>
    ),
    [campaignData]
  );

  return (
    <Drawer isOpen={isFilterDrawerOpen} onClose={onClose}>
      <Drawer.Header>
        {t('__BUGS_PAGE_FILTER_DRAWER_HEADER_TITLE')}
      </Drawer.Header>
      <Drawer.Body>{memoizedFilters}</Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button id="filters-drawer-reset" isPill onClick={onResetClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_RESET_BUTTON')}
          </Button>
        </Drawer.FooterItem>
        <Drawer.FooterItem>
          <WaterButton
            id="filters-drawer-confirm"
            isPrimary
            isPill
            onClick={onCtaClick}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_CONFIRM_BUTTON')}
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="filters-drawer-close" onClick={onClose} />
    </Drawer>
  );
};

export { BugsFilterDrawer };
