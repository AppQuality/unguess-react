import { Accordion, LG, MD, Tag } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/12/user-group-fill.svg';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/12/tag-fill.svg';
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
        <Accordion.Label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: appTheme.space.sm,
              marginBottom: appTheme.space.xs,
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
          <div style={{ marginLeft: appTheme.space.xxl }}>
            <Tag
              isPill
              size="large"
              hue={getBgColor(memoizedGrape.severity)}
              style={{ marginLeft: appTheme.space.xxs }}
            >
              <ObservationIcon
                color={getSeverityColor(memoizedGrape.severity)}
                style={{ width: '24px' }}
              />
              <MD isBold color={getSeverityColor(memoizedGrape.severity)}>
                {memoizedGrape.severity}{' '}
                {memoizedGrape.severityFrequencies[memoizedGrape.severity] || 0}
              </MD>
            </Tag>
            <MD
              isBold
              color={appTheme.palette.grey[700]}
              style={{ display: 'inline', marginRight: appTheme.space.sm }}
            >
              /{memoizedGrape.observations.length} tot.
            </MD>
            <Tag size="large" isPill>
              <UserIcon
                color={appTheme.palette.grey[600]}
                style={{ width: '24px' }}
              />
              <MD>
                Users:{' '}
                <strong style={{ fontWeight: appTheme.fontWeights.semibold }}>
                  {memoizedGrape.usersNumber}
                </strong>
              </MD>
            </Tag>
          </div>
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
