import { AccordionNew, MD, Tag } from '@appquality/unguess-design-system';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/12/user-group-fill.svg';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/12/tag-fill.svg';
import { ArrayHelpers, useFormikContext } from 'formik';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { Grape as GrapeType } from 'src/features/api';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { InsightFormValues } from '../../FormProvider';
import { getSeverityColor, getBgColor } from '../../utils/getSeverityColor';

interface Props {
  push: ArrayHelpers['push'];
  remove: ArrayHelpers['remove'];
  grape: GrapeType & { severityFrequencies: Record<string, number> };
}

export const AccordionHeader = ({ push, remove, grape }: Props) => {
  const { values } = useFormikContext<InsightFormValues>();
  const { observations: grapeObservations } = grape;
  const selectedObservations = useMemo(() => {
    const observationIds = grapeObservations.map((obs) => obs.id);
    return values.observations.filter((obs) => observationIds.includes(obs.id));
  }, [values.observations, grapeObservations]);

  const checkboxState = useMemo(() => {
    if (selectedObservations.length === grapeObservations.length) {
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
  }, [grapeObservations, values.observations]);

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.target.checked) {
        grapeObservations
          // filter out already selected observations looking at their id
          .filter(
            (obs) => !selectedObservations.map((sel) => sel.id).includes(obs.id)
          )
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
    },
    [selectedObservations, values.observations, grapeObservations, push, remove]
  );

  return (
    <AccordionNew.Header
      checkboxProps={{
        onChange: handleCheckboxChange,
        checked: checkboxState.checked,
        indeterminate: checkboxState.indeterminate,
      }}
      key={checkboxState.checked.toString()}
      icon={<TitleIcon color={getSeverityColor(grape.severity)} />}
    >
      <AccordionNew.Label label={grape.title} />

      <AccordionNew.Meta>
        <Tag isPill size="large" hue={getBgColor(grape.severity)}>
          <ObservationIcon
            color={getSeverityColor(grape.severity)}
            style={{
              width: appTheme.space.base * 4,
              height: appTheme.space.base * 4,
              marginRight: appTheme.space.xxs,
            }}
          />
          <MD isBold color={getSeverityColor(grape.severity)}>
            {`${grape.severity}${
              grape.severityFrequencies[grape.severity] > 1 ? 's' : ''
            } `}
            {grape.severityFrequencies[grape.severity] &&
              ` (${grape.severityFrequencies[grape.severity]})`}
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
          {grape.severityFrequencies[grape.severity]
            ? `/${grape.observations.length} tot.`
            : `${grape.observations.length} obs.`}
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
            <strong style={{ fontWeight: appTheme.fontWeights.semibold }}>
              {grape.usersNumber}
            </strong>
          </MD>
        </Tag>
      </AccordionNew.Meta>
    </AccordionNew.Header>
  );
};
