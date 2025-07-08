import styled from 'styled-components';
import { TTask } from '../../hooks';

const Style = styled.div`
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const DragPreview = ({ task }: { task: TTask }) => {
  return (
    <Style>
      <span>{task.title}</span>
    </Style>
  );
};
