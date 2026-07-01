import { Skeleton } from '@appquality/unguess-design-system';
import { SeverityMeta } from 'src/common/components/meta/SeverityMeta';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { CampaignStatus } from 'src/types';
import { UniqueBugsCounter } from './PageHeader/Tools/UniqueBugsCounter';
import { useCampaignBugs } from './PageHeader/Tools/useCampaignBugs';

/**
 * Content-only bug metadata row (unique-bugs count, per-severity counters,
 * campaign status). Extracted from the legacy bug-list header `Tools` so the
 * entity bug-list tab can render it at the top of its content column. The
 * header actions (download report / integration center) are not here: they live
 * in the shared entity header menu.
 */
export const BugsMetaRow = ({
  campaignId,
  className,
}: {
  campaignId: number;
  className?: string;
}) => {
  const {
    isCampaignLoading,
    isCampaignBugsLoading,
    isCampaignFetching,
    isCampaignBugsFetching,
    severities,
    status,
  } = useCampaignBugs(campaignId);

  if (isCampaignLoading || isCampaignBugsLoading) {
    return <Skeleton width="200px" height="30px" />;
  }

  return (
    <PageMeta
      className={className}
      style={{
        opacity: isCampaignFetching || isCampaignBugsFetching ? 0.5 : 1,
      }}
    >
      <UniqueBugsCounter campaignId={campaignId} />
      {severities &&
        Object.keys(severities).map((severity) => (
          <SeverityMeta
            key={severity}
            counter={severities[severity as Severities]}
            severity={severity as Severities}
            size="large"
          />
        ))}
      <Pipe />
      {status && <StatusMeta status={status.name as CampaignStatus} />}
    </PageMeta>
  );
};
