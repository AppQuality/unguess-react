import { Card } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import styled from 'styled-components';
import { Link } from 'react-scroll';

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const TaskItemNav = ({
  task,
}: {
  task: components['schemas']['OutputModuleTask'] & { key: number };
}) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`task-${task.key}`}
      containerId="main"
      activeClass="active"
      duration={500}
      offset={-20}
      smooth
      spy
    >
      <StyledCard key={task.key} data-qa="task-item-nav">
        {task.title}
      </StyledCard>
    </Link>
  );
};

export { TaskItemNav };
