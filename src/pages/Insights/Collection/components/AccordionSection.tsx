import { AccordionNew } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { useMemo, useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ArrayHelpers, FieldArray } from 'formik';
import { getColorWithAlpha } from 'src/common/utils';
import { Divider } from 'src/common/components/divider';
import { AccordionHeader } from './AccordionHeader';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';
import { getBgColor, getSeverityColor } from '../../utils/getSeverityColor';

interface GrapeProps {
  id: string;
  grape: GrapeType;
}

const AccordionNewSection = styled(AccordionNew.Section)<{
  severity: string;
  isOpen: boolean;
}>`
  background-color: white;
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 2px solid;
  border-color: ${({ severity }) => getSeverityColor(severity)};
  ${({ isOpen, severity }) =>
    `box-shadow: ${
      isOpen
        ? `4px 4px ${
            severity && severity !== 'undetermined'
              ? getColorWithAlpha(getBgColor(severity), 0.2)
              : appTheme.palette.grey[400]
          }`
        : `4px 4px ${
            severity && severity !== 'undetermined'
              ? getBgColor(severity)
              : appTheme.palette.grey[200]
          }`
    };`}

  &:hover {
    ${({ isOpen, severity }) =>
      `box-shadow: ${
        !isOpen &&
        `4px 4px ${
          severity && severity !== 'undetermined'
            ? getColorWithAlpha(getBgColor(severity), 0.2)
            : appTheme.palette.grey[400]
        }`
      };`}
  }

  svg[data-garden-id='accordions.rotate_icon'] {
    color: ${({ severity }) => getSeverityColor(severity)};
  }
`;

export const Grape = ({ grape, id }: GrapeProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <AccordionNew
      level={3}
      isExpandable
      defaultExpandedSections={[]}
      isBare
      id={id}
      hasCheckbox
      hasBorder
      responsiveBreakpoint={1027}
      onChange={() => setIsOpen(!isOpen)}
    >
      <AccordionNewSection severity={memoizedGrape.severity} isOpen={isOpen}>
        <FieldArray name="observations">
          {({ push, remove }: ArrayHelpers) => (
            <AccordionHeader
              push={push}
              remove={remove}
              grape={memoizedGrape}
            />
          )}
        </FieldArray>

        <AccordionNew.Panel>
          <Divider style={{ marginBottom: appTheme.space.md }} />
          <CardGrid>
            {memoizedGrape.observations.map((observation) => (
              <ObservationCard key={observation.id} observation={observation} />
            ))}
          </CardGrid>
        </AccordionNew.Panel>
      </AccordionNewSection>
    </AccordionNew>
  );
};
