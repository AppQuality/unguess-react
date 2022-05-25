import { Counter, Skeleton, theme } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  Campaign,
  useGetWorkspacesByWidCampaignsQuery,
} from 'src/features/api';
import styled from 'styled-components';

const Pipe = styled.div`
  /** Vertical Separator */
  border-left: 1px solid ${theme.palette.grey[300]};
  height: 100%;
  margin: 0 ${theme.space.base * 4}px;
  display: inline;
`;

const CounterContainer = styled.div`
  div:first-child {
    padding-left: 0;
  }

  div:last-child {
    padding-right: 0;
  }
`;

const getCounterValues = (campaigns: Campaign[], projectId?: string) => {
  const project =
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
    if (project && cp.project_id !== project) return;

    if (cp.status_name === 'running') counters.running += 1;
    if (cp.status_name === 'completed') counters.completed += 1;
    if (cp.status_name === 'incoming') counters.inComing += 1;

    // Update type counters
    if (cp.campaign_family_name.toLowerCase() === 'functional')
      counters.functional += 1;

    if (cp.campaign_family_name.toLowerCase() === 'experiential')
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
    <CounterContainer>
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
    </CounterContainer>
  );
};
