import {
  Accordion,
  Checkbox,
  getColor,
  Label,
  LG,
  Tag,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/12/user-group-fill.svg';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/12/tag-stroke.svg';
import { ChangeEvent, useMemo } from 'react';
import { appTheme } from 'src/app/theme';
import { ArrayHelpers, FieldArray, useFormikContext } from 'formik';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';
import { InsightFormValues } from '../../FormProvider';

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

const AccordionLabel = styled(Accordion.Label)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Grape = ({ grape }: GrapeProps) => {
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

  const { values } = useFormikContext<InsightFormValues>();

  const selectedObservations = useMemo(() => {
    const observationIds = memoizedGrape.observations.map((obs) => obs.id);
    return values.observations.filter((obs) => observationIds.includes(obs.id));
  }, [values.observations, memoizedGrape.observations]);

  const checkboxState = useMemo(() => {
    if (selectedObservations.length === memoizedGrape.observations.length) {
      return {
        checked: true,
        indeterminate: false,
      };
    }
    if (selectedObservations.length > 0) {
      return {
        checked: false,
        indeterminate: true,
      };
    }
    return {
      checked: false,
      indeterminate: false,
    };
  }, [memoizedGrape.observations, values.observations]);

  return (
    <AccordionSection severity={memoizedGrape.severity}>
      <Accordion.Header>
        <AccordionLabel>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: appTheme.space.sm,
            }}
          >
            <Field>
              <FieldArray name="observations">
                {({ push, remove }: ArrayHelpers) => {
                  const handleCheckboxChange = (
                    e: ChangeEvent<HTMLInputElement>
                  ) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (e.target.checked) {
                      memoizedGrape.observations
                        .filter((obs) => !selectedObservations.includes(obs))
                        .forEach((obs) => {
                          push(obs);
                        });
                    } else {
                      selectedObservations.forEach((obs, i) => {
                        // use i to update the index of the removed obs
                        // because we are removing elements but values are not updated
                        remove(values.observations.indexOf(obs) - i);
                      });
                    }
                  };
                  return (
                    <Checkbox
                      aria-checked={checkboxState.checked ? 'true' : 'false'}
                      checked={checkboxState.checked}
                      indeterminate={checkboxState.indeterminate}
                      onChange={handleCheckboxChange}
                      // use key to force re-render
                      key={values.observations.length}
                    >
                      <Label>
                        <span>
                          <TitleIcon
                            color={getSeverityColor(
                              memoizedGrape.severity,
                              appTheme
                            )}
                          />
                        </span>
                      </Label>
                    </Checkbox>
                  );
                }}
              </FieldArray>
            </Field>
            <LG isBold>{memoizedGrape.title}</LG>
          </div>
          <div>
            <Tag
              isPill
              hue={getDropShadowColor(memoizedGrape.severity, appTheme)}
            >
              <ObservationIcon />
              {memoizedGrape.observations.length}
            </Tag>
            <Tag isPill>
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
