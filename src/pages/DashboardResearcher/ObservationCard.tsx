import { useRef, useEffect, useState } from 'react';
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { SpecialCard, Card } from '@appquality/unguess-design-system';
import { Observation } from './data';

const ObservationCard = ({ title, quote }: Observation) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false); // NEW
  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart: () => setDragging(true), // NEW
      onDrop: () => setDragging(false), // NEW
    });
  }, []);
  return (
    <Card>
      <div ref={ref}>{quote}</div>
    </Card>
  );
};

export default ObservationCard;
