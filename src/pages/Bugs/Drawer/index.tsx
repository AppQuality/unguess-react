import {
  Button,
  Drawer,
  MD,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import {
  getCurrentCampaignData,
  getIsNaBugExcluded,
  resetFilters,
  setFilterDrawerOpen,
} from 'src/features/bugsPage/bugsPageSlice';
import { Bug } from 'src/features/api';
import { getExcludeNotABugInfo } from 'src/common/components/utils/getExcludeNotABugInfo';
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
import { BugItem } from '../types';

const BugsFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isFilterDrawerOpen, currentCampaign } = useAppSelector((state) => ({
    isFilterDrawerOpen: state.bugsPage.isFilterDrawerOpen,
    currentCampaign: state.bugsPage.currentCampaign,
  }));

  const campaignData = getCurrentCampaignData();

  const customStatusNotABugInfo = getExcludeNotABugInfo(t);

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
      <div className="bugs-filters-drawer">
        <MD
          isBold
          style={{
            color: appTheme.palette.grey[600],
            marginBottom: appTheme.space.sm,
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
            color: appTheme.palette.grey[600],
            marginBottom: appTheme.space.sm,
            marginTop: appTheme.space.md,
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
            color: appTheme.palette.grey[600],
            marginBottom: appTheme.space.sm,
            marginTop: appTheme.space.md,
          }}
        >
          {t('__BUGS_PAGE_FILTER_DRAWER_BODY_BUG_LABEL')}
        </MD>
        {replicabilities.available.length ? (
          <ReplicabilityField replicabilities={replicabilities} />
        ) : null}
        {devices.available.length ? <DeviceField devices={devices} /> : null}
        {os.available.length ? <OsField os={os} /> : null}
      </div>
    );
  }, [campaignData]);

  const { bugs } = useCampaignBugs(currentCampaign ?? 0);

  const currentIsNaBugExcluded = getIsNaBugExcluded();
  let bugItems: BugItem[] = [];
  if (bugs && bugs.items && bugs.items?.length > 0) {
    if (currentIsNaBugExcluded) {
      bugItems = bugs.items.filter(
        (item: Bug) =>
          item.custom_status.id !== customStatusNotABugInfo.customStatusId
      );
    } else {
      bugItems = bugs.items;
    }
  }

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
          <Button id="filters-drawer-reset" onClick={onResetClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_RESET_BUTTON')}
          </Button>
        </Drawer.FooterItem>
        <Drawer.FooterItem>
          <Button
            id="filters-drawer-confirm"
            isPrimary
            isAccent
            onClick={onCtaClick}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_CONFIRM_BUTTON')}
            {bugItems.length && ` (${bugItems.length})`}
          </Button>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="filters-drawer-close" onClick={onClose} />
    </Drawer>
  );
};

export { BugsFilterDrawer };
