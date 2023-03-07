import { Skeleton } from '@appquality/unguess-design-system';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  Campaign,
  useGetWorkspacesByWidCampaignsQuery,
} from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import useWindowSize from 'src/hooks/useWindowSize';

const Pipe = styled.span`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: ${({ theme }) => theme.space.lg};
  margin-right: ${({ theme }) => theme.space.sm};
  display: inline;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

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
  const { width } = useWindowSize();
  const breakpoint = parseInt(globalTheme.breakpoints.lg, 10);
  const hide = width < breakpoint;

  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  const { projectId } = useParams();

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidCampaignsQuery({
      wid: activeWorkspace?.id ?? 0,
    });

  if (isError) return null; // TODO: Improve error handling

  const { running, completed, inComing, functional, experiential } =
    getCounterValues(data?.items ?? [], projectId) || 0;

  return isLoading || isFetching ? (
    <Skeleton width="30%" height="32px" />
  ) : (
    <div style={{ marginTop: globalTheme.space.xxs }}>
      <StatusMeta counter={completed} status="completed" />
      <StatusMeta counter={running} status="running" />
      <StatusMeta counter={inComing} status="incoming" />
      {!hide && <Pipe />}
      <StatusMeta counter={functional} status="functional" />
      <StatusMeta counter={experiential} status="experiential" />
    </div>
  );
};
