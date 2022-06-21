import { Counter, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  Campaign,
  useGetWorkspacesByWidCampaignsQuery,
} from 'src/features/api';
import styled from 'styled-components';

const Pipe = styled.span`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: ${({ theme }) => theme.space.lg};
  margin-right: ${({ theme }) => theme.space.sm};
  display: inline;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 0;
    margin: 0;
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
  const { t } = useTranslation();
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
    <>
      <Counter counter={completed} status="completed">
        {t('__DASHABOARD_COUNTER_LABEL_COMPLETED')}
      </Counter>
      <Counter counter={running} status="progress">
        {t('__DASHABOARD_COUNTER_LABEL_PROGRESS')}
      </Counter>
      <Counter counter={inComing} status="incoming">
        {t('__DASHABOARD_COUNTER_LABEL_INCOMING')}
      </Counter>
      <Pipe />
      <Counter counter={functional} status="functional">
        {t('__DASHABOARD_COUNTER_LABEL_FUNCTIONAL')}
      </Counter>
      <Counter counter={experiential} status="experiential">
        {t('__DASHABOARD_COUNTER_LABEL_EXPERIENTIAL')}
      </Counter>
    </>
  );
};
