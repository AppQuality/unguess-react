import {
  Accordion,
  Checkbox,
  getColor,
  Label,
  LG,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { useMemo } from 'react';
import { appTheme } from 'src/app/theme';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';

interface GrapeProps {
  grape: GrapeType;
}

const getSeverityColor = (severity: string, theme: typeof appTheme) => {
  switch (severity) {
    case 'minor-issue':
      return getColor(theme.colors.warningHue, 700);
    case 'major-issue':
      return getColor(theme.colors.dangerHue, 600);
    case 'observation':
      return getColor(theme.colors.primaryHue, 400);
    case 'positive-finding':
      return getColor(theme.colors.successHue, 700);
    default:
      return theme.palette.grey[500];
  }
};

const getDropShadowColor = (severity: string, theme: typeof appTheme) => {
  switch (severity) {
    case 'minor-issue':
      return getColor(theme.colors.warningHue, 200);
    case 'major-issue':
      return getColor(theme.colors.dangerHue, 200);
    case 'observation':
      return getColor(theme.colors.primaryHue, 200);
    case 'positive-finding':
      return getColor(theme.colors.successHue, 200);
    default:
      return theme.palette.grey[200];
  }
};

const AccordionSection = styled(Accordion.Section)<{ severity: string }>`
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 2px solid;
  border-color: ${({ severity, theme }) => getSeverityColor(severity, theme)};
  box-shadow: 4px 4px
    ${({ severity, theme }) => getDropShadowColor(severity, theme)};
`;

export const Grape = ({ grape }: GrapeProps) => {
  const handleCheckboxChange = (value: any) => {
    // eslint-disable-next-line no-alert
    alert(`secelt all obs ${value}`);
  };
  const memoizedGrape = useMemo(() => {
    const grapeSeverity = grape.severity.replace(' ', '-').toLowerCase();
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
      severity: grapeSeverity,
      observations,
      severityFrequencies,
    };
  }, [grape]);

  return (
    <AccordionSection severity={memoizedGrape.severity}>
      <Accordion.Header>
        <Accordion.Label>
          <Checkbox checked={false} onChange={handleCheckboxChange}>
            <Label>
              <TitleIcon
                color={getSeverityColor(memoizedGrape.severity, appTheme)}
              />
              <LG isBold>{memoizedGrape.title}</LG>
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
