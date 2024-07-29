import {
  Accordion,
  getColor,
  LG,
  Tag,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/12/user-group-fill.svg';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/12/tag-stroke.svg';
import { useMemo } from 'react';
import { appTheme } from 'src/app/theme';
import { ArrayHelpers, FieldArray } from 'formik';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';
import { GrapeCheckbox } from './GrapeCheckbox';
import { getBgColor, getSeverityColor } from '../../utils/getSeverityColor';

interface GrapeProps {
  grape: GrapeType;
  isOpen: boolean;
}

const AccordionSection = styled(Accordion.Section)<{ severity: string }>`
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 2px solid;
  border-color: ${({ severity }) => getSeverityColor(severity)};
  box-shadow: 4px 4px ${({ severity }) => getBgColor(severity)};
  svg[data-garden-id='accordions.rotate_icon'] {
    color: ${({ severity }) => getSeverityColor(severity)};
  }
`;

const AccordionLabel = styled(Accordion.Label)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Grape = ({ grape, isOpen }: GrapeProps) => {
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
    <AccordionSection
      severity={memoizedGrape.severity}
      {...(!isOpen && {
        style: {
          backgroundColor: appTheme.palette.white,
        },
      })}
    >
      <Accordion.Header>
        <AccordionLabel>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: appTheme.space.sm,
            }}
          >
            <FieldArray name="observations">
              {({ push, remove }: ArrayHelpers) => (
                <GrapeCheckbox
                  push={push}
                  remove={remove}
                  grapeObservations={memoizedGrape.observations}
                />
              )}
            </FieldArray>
            <TitleIcon color={getSeverityColor(memoizedGrape.severity)} />
            <LG isBold>{memoizedGrape.title}</LG>
          </div>
          <div>
            <Tag isPill size="large" hue={getBgColor(memoizedGrape.severity)}>
              <ObservationIcon />
              {memoizedGrape.observations.length}
            </Tag>
            <Tag size="large" isPill>
              <UserIcon color={getColor(appTheme.colors.accentHue, 600)} />
              {memoizedGrape.usersNumber}
            </Tag>
          </div>
        </AccordionLabel>
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
