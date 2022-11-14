import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { Severities } from './types';

const useBugs = (cid: number) => {
  const { data, isLoading } = useGetCampaignsByCidBugsQuery({
    cid,
    filterBy: { is_duplicated: 0 },
  });

  if (isLoading) {
    return { data: {}, isLoading: true };
  }

  const results: {
    bySeverity: PartialRecord<Severities, number>;
    total?: number;
  } = {
    bySeverity: {},
  };

  if (data && data.items) {
    results.total = data.items.length;
    const criticalBugsCount = data.items.filter(
      (bug) => bug.severity.name === 'CRITICAL'
    ).length;
    if (criticalBugsCount) results.bySeverity.critical = criticalBugsCount;
    const highBugCount = data.items.filter(
      (bug) => bug.severity.name === 'HIGH'
    ).length;
    if (highBugCount) results.bySeverity.high = highBugCount;
    const mediumBugCount = data.items.filter(
      (bug) => bug.severity.name === 'MEDIUM'
    ).length;
    if (mediumBugCount) results.bySeverity.medium = mediumBugCount;
    const lowBugCount = data.items.filter(
      (bug) => bug.severity.name === 'LOW'
    ).length;
    if (lowBugCount) results.bySeverity.low = lowBugCount;
  }

  return { data: results, isLoading: false };
};

export { useBugs };
