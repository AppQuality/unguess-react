import { CopilotChat } from '@copilotkit/react-ui';
import { CopilotKit } from '@copilotkit/react-core';
// eslint-disable-next-line import/no-unresolved
import '@copilotkit/react-ui/styles.css';
import styled from 'styled-components';
import { useGetUsersMeQuery } from 'src/features/api';

const Chat = styled(CopilotChat)`
  font-family: inherit;

  .poweredBy {
    display: none !important;
  }
`;

export const Workflow = () => {
  const runtimeUrl =
    process.env.REACT_APP_COPILOTKIT_RUNTIME_URL ||
    'http://localhost:4111/copilotkit';

  const { data: userData, isLoading, isFetching } = useGetUsersMeQuery();

  if (isLoading || isFetching) {
    return <>...</>;
  }

  return (
    <CopilotKit runtimeUrl={runtimeUrl} agent="WorkflowAgent">
      <Chat
        labels={{
          title: 'E2E Supervisor',
          initial: `Ciao ${
            userData?.first_name || 'User'
          }, come posso aiutarti oggi?`,
        }}
      />
    </CopilotKit>
  );
};
