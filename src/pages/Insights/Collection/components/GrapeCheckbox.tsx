import { Field } from '@zendeskgarden/react-forms';
import { ArrayHelpers, useFormikContext } from 'formik';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { Grape as GrapeType } from 'src/features/api';
import { Checkbox, Label } from '@appquality/unguess-design-system';
import { InsightFormValues } from '../../FormProvider';

interface Props {
  push: ArrayHelpers['push'];
  remove: ArrayHelpers['remove'];
  grapeObservations: GrapeType['observations'];
}
export const GrapeCheckbox = ({ push, remove, grapeObservations }: Props) => {
  const { values } = useFormikContext<InsightFormValues>();

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
    <Field>
      <Checkbox
        onChange={handleCheckboxChange}
        // use key to force re-render
        key={values.observations.length}
        {...checkboxState}
      >
        <Label hidden>
          select or deselect all observations in this cluster
        </Label>
      </Checkbox>
      );
    </Field>
  );
};
