import { Card, Button } from '@appquality/unguess-design-system';
import { useState } from 'react';

interface ClusterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  observations: {
    id: number;
    title: string;
    severity: number;
    quote: string;
  }[];
  severity: number;
}
export const ClusterCard = ({
  observations,
  severity,
  children,
  id,
}: ClusterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Card>
        {children}
        <Button onClick={handleClick}>{isOpen ? 'Close' : 'Open'}</Button>
      </Card>
      {isOpen && (
        <Card>
          <blockquote>
            {observations.map((observation) => (
              <p key={observation.id}>{observation.quote}</p>
            ))}
          </blockquote>
        </Card>
      )}
    </>
  );
};
