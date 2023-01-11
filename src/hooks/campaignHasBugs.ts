import { CampaignWithOutput } from 'src/features/api';

export function campaignHasBugs(props: CampaignWithOutput): boolean {
  const { outputs } = props;

  if (!outputs || outputs.length === 0) return false;

  if (outputs.some((o) => o === 'bugs')) return true;

  return false;
}
