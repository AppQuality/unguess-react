import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

const StyledDrawer = styled.div<{ isDraggedOver?: boolean }>`
  padding: 20px;
  text-align: left;
  border: 1px dashed ${(props) => (props.isDraggedOver ? 'blue' : 'black')};
  background-color: ${(props) => (props.isDraggedOver ? 'lightblue' : 'white')};
  min-width: ${(props) => (props.isDraggedOver ? '200px' : '100px')};
  transition: all 0.3s;
`;

export const InsightDrawer = () => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);
  return (
    <StyledDrawer
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        border: `2px dashed ${isDraggedOver ? 'blue' : 'black'}`,
      }}
      isDraggedOver={isDraggedOver}
    >
      Drag and drop insights here
    </StyledDrawer>
  );
};
