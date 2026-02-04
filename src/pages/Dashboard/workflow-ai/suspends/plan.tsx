import { useGetPlansByPidQuery } from 'src/features/api';
import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PlanCard } from '../../PlanCard';
import { ChatMessage } from './base';

const StyledDiv = styled.div`
  padding: 0 8px;
`;

export const PlanPart = ({
  key,
  plan_id,
}: {
  key: string;
  plan_id?: string;
}) => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError } = useGetPlansByPidQuery(
    {
      pid: plan_id || '',
    },
    {
      skip: !plan_id,
    }
  );

  if (!plan_id || isError || !data) {
    return <>{t('MASTRA_WORKFLOW_PART_PLAN_NOT_FOUND_OR_NOT_LOADED')}</>;
  }

  if (isLoading || isFetching) return null;

  // get Title module from plan modules
  const titleModule = data.config.modules.find(
    (module) => module.type === 'title'
  );

  return (
    <StyledDiv key={key}>
      <ChatMessage isUser={false}>
        <MD>
          <span>{t('MASTRA_WORKFLOW_PART_PLAN_CREATED_SUCCESSFULLY')}</span>
        </MD>
      </ChatMessage>
      <PlanCard
        plan={{
          ...data,
          title: titleModule?.output || 'Newly created plan',
          project: { ...data.project, title: data.project.name },
        }}
      />
    </StyledDiv>
  );
};
