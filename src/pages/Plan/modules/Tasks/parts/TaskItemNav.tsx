import { Card, MD } from '@appquality/unguess-design-system';
import { Link } from 'react-scroll';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { useModuleTasks } from '../hooks';
import { getIconFromKind } from '../utils';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const TaskItemNav = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { error } = useModuleTasks();

  return (
    <Link
      to={`task-${task.key}`}
      containerId="main"
      duration={500}
      offset={-20}
      smooth
      spy
      style={{ textDecoration: 'none' }}
    >
      <StyledCard key={task.key} data-qa="task-item-nav">
        <StyledContainer>
          {getIconFromKind(task.kind)}
          <MD isBold>{task.title}</MD>
        </StyledContainer>
        {JSON.stringify(error)}
      </StyledCard>
    </Link>
  );
};

export { TaskItemNav };
