import {
  Card,
  SpecialCard,
  Button,
  Checkbox,
  Label,
} from '@appquality/unguess-design-system';
import { Field as ZendeskField } from '@zendeskgarden/react-forms';
import { useState } from 'react';
import { CardBackground } from './CardBackground';
import { ObservationCard } from './ObservationCard';

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
      <CardBackground isOpen={isOpen}>
        <SpecialCard>
          <ZendeskField>
            <Checkbox name="cluster-1">
              <Label isRegular>UC-1 Homepage</Label>
            </Checkbox>
          </ZendeskField>
          {children}
          <Button onClick={handleClick}>{isOpen ? 'Close' : 'Open'}</Button>
        </SpecialCard>
      </CardBackground>
      {isOpen &&
        observations.map((observation) => (
          <ObservationCard
            key={observation.id}
            isOpen={isOpen}
            quote={observation.quote}
          />
        ))}
      {isOpen && 'divisore'}
    </>
  );
};
