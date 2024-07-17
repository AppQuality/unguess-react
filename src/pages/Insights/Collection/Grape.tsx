import { Accordion, LG } from '@appquality/unguess-design-system';
import { useState } from 'react';
import styled from 'styled-components';
import { ObservationCard } from './ObservationCard';

interface GrapeProps {
  grape: {
    internalId: string;
    title: string;
    severity: string;
    usersNumber: number;
    observations: {
      id: number;
      title: string;
      description: string;
      start: number;
      end: number;
      quotes: string;
      uxNote: string;
    }[];
  };
}

const InnerPanel = styled(Accordion.Panel)`
  display: flex;
  flex-flow: row wrap;
`;

export const Grape = ({ grape }: GrapeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Accordion
      level={3}
      style={{ backgroundColor: 'white' }}
      id={grape.internalId}
    >
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label>
            <LG isBold>{grape.title}</LG>
          </Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel>
          <InnerPanel>
            {grape.observations.map((observation) => (
              <ObservationCard
                key={observation.id}
                quote={observation.quotes}
              />
            ))}
          </InnerPanel>
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};
