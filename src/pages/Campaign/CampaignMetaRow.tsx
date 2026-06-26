import { Skeleton } from '@appquality/unguess-design-system';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import {
  useGetCampaignsByCidMetaQuery,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { CampaignStatus } from 'src/types';
import { CampaignDurationMeta } from './pageHeader/Meta/CampaignDurationMeta';
import { DesktopMeta } from './pageHeader/Meta/DesktopMeta';
import { SmartphoneMeta } from './pageHeader/Meta/SmartphoneMeta';
import { TabletMeta } from './pageHeader/Meta/TabletMeta';
import { TvMeta } from './pageHeader/Meta/TvMeta';

/**
 * Content-only informational meta row (status, duration, devices) for the
 * campaign overview. The action buttons that used to live next to this row in
 * the legacy `Metas` component now belong to the shared `EntityPageHeader`, so
 * they are intentionally not rendered here.
 */
export const CampaignMetaRow = ({
  campaignId,
  className,
}: {
  campaignId: string;
  className?: string;
}) => {
  const {
    data: campaign,
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
  } = useGetCampaignsByCidQuery({ cid: campaignId });
  const {
    data: meta,
    isLoading: isMetaLoading,
    isFetching: isMetaFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaignId });

  if (
    isCampaignLoading ||
    isCampaignFetching ||
    isMetaLoading ||
    isMetaFetching ||
    !campaign
  ) {
    return <Skeleton width="500px" height="20px" />;
  }

  const { start_date, end_date, type, status, family } = campaign;

  return (
    <PageMeta className={className} data-qa="campaign_pageHeader_meta">
      <StatusMeta status={family.name.toLowerCase() as CampaignStatus}>
        {type.name}
      </StatusMeta>
      <StatusMeta status={status.name as CampaignStatus} />
      <CampaignDurationMeta start={start_date} end={end_date} />
      {meta ? (
        <>
          <Pipe />
          {meta.allowed_devices.includes('desktop') && <DesktopMeta />}
          {meta.allowed_devices.includes('smartphone') && <SmartphoneMeta />}
          {meta.allowed_devices.includes('tablet') && <TabletMeta />}
          {meta.allowed_devices.includes('tv') && <TvMeta />}
        </>
      ) : null}
    </PageMeta>
  );
};
