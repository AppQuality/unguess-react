import { Transition } from 'motion/react';
import * as motion from 'motion/react-client';
import styled from 'styled-components';
import { TTask } from '../hooks';
import { TaskItem } from './TaskItem';

const StyledWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.space.xs};
`;

type TasksContainerAnimationProps = {
  tasks: TTask[];
};

const spring: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

const TasksContainerAnimation = ({ tasks }: TasksContainerAnimationProps) => {
  return (
    <StyledWrapper>
      <motion.ul role="list" layout transition={spring}>
        {tasks.map((task, index) => (
          <motion.li key={task.id} layout>
            <TaskItem task={task} index={index} />
          </motion.li>
        ))}
      </motion.ul>
    </StyledWrapper>
  );
};

export { TasksContainerAnimation };
