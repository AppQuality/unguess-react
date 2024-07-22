import {
  Accordion,
  Checkbox,
  Label,
  LG,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { useMemo } from 'react';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';

interface GrapeProps {
  grape: GrapeType;
}

const AccordionSection = styled(Accordion.Section)<{ severity: string }>`
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  border: 1px solid;
  ${({ severity, theme }) => {
    switch (severity) {
      case 'Minor issue':
        return `
          border-color: ${theme.palette.orange[400]}66;
        `;
      case 'Major issue':
        return `
          border-color: ${theme.palette.crimson[400]}66;
        `;
      case 'Observation':
        return `
          border-color: ${theme.palette.royal[600]}66;
        `;
      case 'Positive':
        return `
          border-color: ${theme.palette.green[400]}66;
        `;
      default:
        return `
          border-color: ${theme.palette.grey[400]}66;
        `;
    }
  }}
`;

export const Grape = ({ grape }: GrapeProps) => {
  const handleCheckboxChange = (value: any) => {
    // eslint-disable-next-line no-alert
    alert(`secelt all obs ${value}`);
  };
  const memoizedGrape = useMemo(() => {
    const observations = grape.observations.map((obs) => {
      // cerchiamo il tag severity in the middle of the shit
      const severity = obs.tags.find((tag) => tag.group.name === 'severity');
      // torniamo un oggetto che espone la severity in modo sensato
      return {
        ...obs,
        severity: severity?.tag,
      };
    });
    const severityFrequencies = observations.reduce<{ [key: string]: number }>(
      (acc, observation) => {
        // check se effettivamente l'obs ha una severity perché dal type non lo sappiamo
        if (observation.severity) {
          // aggiorniamo distribuzione
          const current = acc[observation.severity.name] || 0;
          acc[observation.severity.name] = current + 1;
        }
        return acc;
      },
      {}
    );

    return {
      ...grape,
      observations,
      severityFrequencies,
    };
  }, [grape]);

  return (
    <AccordionSection severity={grape.severity}>
      <Accordion.Header>
        <Accordion.Label>
          <Checkbox checked={false} onChange={handleCheckboxChange}>
            <Label>
              <LG isBold>{grape.title}</LG>
              {memoizedGrape.observations.length} observations
            </Label>
          </Checkbox>
        </Accordion.Label>
      </Accordion.Header>
      <Accordion.Panel>
        <CardGrid>
          {memoizedGrape.observations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </CardGrid>
      </Accordion.Panel>
    </AccordionSection>
  );
};
