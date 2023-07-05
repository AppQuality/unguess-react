import { Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import {
  Campaign,
  useGetWorkspacesByWidCampaignsQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

const getCounterValues = (campaigns: Campaign[], projectId?: string) => {
  const prjId =
    projectId && !Number.isNaN(Number(projectId))
      ? parseInt(projectId, 10)
      : false;

  const counters = {
    running: 0,
    completed: 0,
    inComing: 0,
    functional: 0,
    experiential: 0,
  };

  campaigns.forEach((cp) => {
    const { status, family, project } = cp;

    if (prjId && project.id !== prjId) return;

    if (status.name === 'running') counters.running += 1;
    if (status.name === 'completed') counters.completed += 1;
    if (status.name === 'incoming') counters.inComing += 1;

    // Update type counters
    if (family.name.toLowerCase() === 'functional') counters.functional += 1;

    if (family.name.toLowerCase() === 'experiential')
      counters.experiential += 1;
  });

  return counters;
};

export const Counters = () => {
  const { activeWorkspace } = useActiveWorkspace();

  const { projectId } = useParams();

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidCampaignsQuery({
      wid: activeWorkspace?.id.toString() || '',
    });

  if (isError) return null; // TODO: Improve error handling

  const { running, completed, inComing, functional, experiential } =
    getCounterValues(data?.items ?? [], projectId) || 0;

  return isLoading || isFetching ? (
    <Skeleton width="30%" height="32px" />
  ) : (
    <PageMeta>
      <StatusMeta counter={completed} status="completed" />
      <StatusMeta counter={running} status="running" />
      <StatusMeta counter={inComing} status="incoming" />
      <Pipe />
      <StatusMeta counter={functional} status="functional" />
      <StatusMeta counter={experiential} status="experiential" />
    </PageMeta>
  );
};
