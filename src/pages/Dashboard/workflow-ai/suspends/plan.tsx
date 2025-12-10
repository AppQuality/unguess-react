import { useGetPlansByPidQuery } from 'src/features/api';
import { MD } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { PlanCard } from '../../PlanCard';
import { ChatMessage } from './base';

const StyledDiv = styled.div`
  padding: 0 8px;
`;

export const PlanPart = ({
  id,
  key,
  plan_id,
}: {
  id: string;
  key: string;
  plan_id?: string;
}) => {
  const { data, isLoading, isFetching, isError } = useGetPlansByPidQuery(
    {
      pid: plan_id || '',
    },
    {
      skip: !plan_id,
    }
  );

  if (!plan_id || isError || !data) {
    return <>Plan not found or not loaded</>;
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
          <span>✅ Plan creato con successo!</span>
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
