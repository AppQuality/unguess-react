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
import { useCampaignBugs } from '../Content/BugsTable/hooks/useCampaignBugs';
import { DeviceField } from './DeviceField';
import { OsField } from './OsField';
import { ReadField } from './ReadField';
import { ReplicabilityField } from './ReplicabilityField';
import { SeverityField } from './SeverityField';
import { TagField } from './TagField';
import { TypeField } from './TypeField';
import { UniqueField } from './UniqueField';
import { UseCaseField } from './UseCaseField';
import { PriorityField } from './PriorityField';
import { CustomStatusField } from './CustomStatusField';

export const WaterButton = styled(Button)``;

WaterButton.defaultProps = {
  themeColor: globalTheme.palette.water[600],
};

const BugsFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isFilterDrawerOpen, currentCampaign } = useAppSelector((state) => ({
    isFilterDrawerOpen: state.bugsPage.isFilterDrawerOpen,
    currentCampaign: state.bugsPage.currentCampaign,
  }));

  const campaignData = getCurrentCampaignData();

  const memoizedFilters = useMemo(() => {
    if (!campaignData) return <Skeleton />;

    const {
      types,
      severities,
      unique,
      tags,
      priorities,
      customStatuses,
      useCases,
      devices,
      os,
      replicabilities,
      read,
    } = campaignData;

    return (
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
        <UniqueField unique={unique} />
        <ReadField read={read} />
        {severities.available.length ? (
          <SeverityField severities={severities} />
        ) : null}
        {types.available.length ? <TypeField types={types} /> : null}
        {useCases.available.length ? (
          <UseCaseField useCases={useCases} />
        ) : null}
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
        {customStatuses.available.length ? (
          <CustomStatusField customStatuses={customStatuses} />
        ) : null}
        {priorities.available.length ? (
          <PriorityField priorities={priorities} />
        ) : null}
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
        {replicabilities.available.length ? (
          <ReplicabilityField replicabilities={replicabilities} />
        ) : null}
        {devices.available.length ? <DeviceField devices={devices} /> : null}
        {os.available.length ? <OsField os={os} /> : null}
      </>
    );
  }, [campaignData]);

  const { bugs } = useCampaignBugs(currentCampaign ?? 0);

  if (!campaignData || !currentCampaign) return <Skeleton />;

  const onClose = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCtaClick = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onResetClick = () => {
    dispatch(resetFilters());
  };

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
            {bugs &&
              bugs.items &&
              bugs.items?.length > 0 &&
              ` (${bugs?.items?.length})`}
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="filters-drawer-close" onClick={onClose} />
    </Drawer>
  );
};

export { BugsFilterDrawer };
