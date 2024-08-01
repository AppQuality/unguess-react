import { Accordion, LG, MD, Tag } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/12/user-group-fill.svg';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/12/tag-fill.svg';
import { useMemo, useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ArrayHelpers, FieldArray } from 'formik';
import { getColorWithAlpha } from 'src/common/utils';
import { Pipe } from 'src/common/components/Pipe';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';
import { GrapeCheckbox } from './GrapeCheckbox';
import { getBgColor, getSeverityColor } from '../../utils/getSeverityColor';

const Grid = styled.div`
  container-type: inline-size;

  #container {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${({ theme }) => theme.space.md};
  }

  @container (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    #container {
      grid-template-columns: auto;
      grid-template-rows: auto;
    }
  }
`;

interface GrapeProps {
  id: string;
  grape: GrapeType;
}

const AccordionSection = styled(Accordion.Section)<{
  severity: string;
  isOpen: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 2px solid;
  border-color: ${({ severity }) => getSeverityColor(severity)};
  ${({ isOpen, severity }) =>
    `box-shadow: ${
      isOpen
        ? `4px 4px ${getColorWithAlpha(getBgColor(severity), 0.2)}`
        : `4px 4px ${getBgColor(severity)}`
    };`}
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
    <Accordion
      level={3}
      isExpandable
      defaultExpandedSections={[]}
      isBare
      id={id}
      onChange={() => setIsOpen(!isOpen)}
    >
      <AccordionSection
        severity={memoizedGrape.severity}
        isOpen={isOpen}
        {...(!isOpen && {
          style: {
            backgroundColor: appTheme.palette.white,
          },
        })}
      >
        <Accordion.Header>
          <Accordion.Label>
            <Grid>
              <div id="container">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: appTheme.space.xs,
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
                  <LG
                    isBold
                    {...(isOpen && {
                      style: {
                        color: appTheme.palette.blue[600],
                      },
                    })}
                  >
                    {memoizedGrape.title}
                  </LG>
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
                      style={{
                        width: appTheme.space.base * 4,
                        height: appTheme.space.base * 4,
                        marginRight: appTheme.space.xxs,
                      }}
                    />
                    <MD isBold color={getSeverityColor(memoizedGrape.severity)}>
                      {`${memoizedGrape.severity}${
                        memoizedGrape.severityFrequencies[
                          memoizedGrape.severity
                        ] > 1
                          ? 's'
                          : ''
                      } `}
                      {memoizedGrape.severityFrequencies[
                        memoizedGrape.severity
                      ] &&
                        ` (${
                          memoizedGrape.severityFrequencies[
                            memoizedGrape.severity
                          ]
                        })`}
                    </MD>
                  </Tag>
                  <MD
                    isBold
                    color={appTheme.palette.grey[700]}
                    style={{
                      display: 'inline',
                      marginRight: appTheme.space.sm,
                    }}
                  >
                    {memoizedGrape.severityFrequencies[memoizedGrape.severity]
                      ? `/${memoizedGrape.observations.length} tot.`
                      : `${memoizedGrape.observations.length} obs.`}
                  </MD>
                  <Pipe />
                  <Tag size="large" isPill>
                    <UserIcon
                      color={appTheme.palette.grey[600]}
                      style={{
                        width: appTheme.space.base * 5,
                        height: appTheme.space.base * 5,
                        marginRight: appTheme.space.xxs,
                      }}
                    />
                    <MD>
                      Users:{' '}
                      <strong
                        style={{ fontWeight: appTheme.fontWeights.semibold }}
                      >
                        {memoizedGrape.usersNumber}
                      </strong>
                    </MD>
                  </Tag>
                </div>
              </div>
            </Grid>
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
    </Accordion>
  );
};
