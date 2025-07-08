import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { TaskItem } from './TaskItem';

const StyledWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.space.xs};
`;

type TasksContainerAnimationProps = {
  children?: ReactNode;
};

const TasksContainerAnimation = ({
  children,
}: TasksContainerAnimationProps) => {
  const [boundingBoxes, setBoundingBoxes] = useState<Record<string, DOMRect>>(
    {}
  );
  // Store refs to all TaskItem nodes
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  // After render, measure all TaskItems and update boundingBoxes
  useLayoutEffect(() => {
    const newBoxes: Record<string, DOMRect> = {};
    Object.entries(itemRefs.current).forEach(([idx, el]) => {
      if (el) newBoxes[idx] = el.getBoundingClientRect();
    });
    setBoundingBoxes((prev) => {
      // do something with the previous state if needed
      console.log('animation prev', prev);
      console.log('animation new', newBoxes);
      return {
        ...newBoxes,
      };
    });
  }, [children]);

  return (
    <StyledWrapper role="list">
      {/*
        Only add ref to children that are TaskItem components.
        All children passed here should be <TaskItem /> for animation/measurement.
      */}
      {Children.map(children, (child, idx) => {
        if (!isValidElement(child)) return null;
        if (child.type === TaskItem) {
          return cloneElement(child as any, {
            ref: (el: HTMLElement | null) => {
              if (child.key != null) {
                // @ts-ignore
                itemRefs.current[child.key] = el;
              }
            },
          });
        }
        return child;
      })}
    </StyledWrapper>
  );
};

export { TasksContainerAnimation };
