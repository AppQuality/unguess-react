import { Checkbox, LG, Label } from '@appquality/unguess-design-system';
import { Field as ZendeskField } from '@zendeskgarden/react-forms';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { InsightFormValues } from './FormProvider';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Collection = () => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<InsightFormValues>();

  // eslint-disable-next-line no-console
  console.log(values);

  return (
    <Container>
      <LG>{t('__INSIGHTS_PAGE_COLLECTION_TITLE')}</LG>
      <ZendeskField>
        <Checkbox
          name="observations-1"
          checked={
            !!values.observations.find((observation) => observation.id === 1)
          }
          onChange={(e) => {
            const isChecked = e.target.checked;

            if (isChecked) {
              setFieldValue('observations', [
                ...values.observations,
                {
                  id: 1,
                  title: 'Observation #1',
                  severity: 1,
                  quotes: '',
                },
              ]);
            } else {
              setFieldValue(
                'observations',
                values.observations.filter(
                  (observation) => observation.id !== 1
                )
              );
            }
          }}
        >
          <Label isRegular>Observation #1</Label>
        </Checkbox>
      </ZendeskField>
      <ZendeskField>
        <Checkbox
          name="observations-2"
          checked={
            !!values.observations.find((observation) => observation.id === 2)
          }
          onChange={(e) => {
            const isChecked = e.target.checked;

            if (isChecked) {
              setFieldValue('observations', [
                ...values.observations,
                {
                  id: 2,
                  title: 'Observation #2',
                  severity: 1,
                  quotes: '',
                },
              ]);
            } else {
              setFieldValue(
                'observations',
                values.observations.filter(
                  (observation) => observation.id !== 2
                )
              );
            }
          }}
        >
          <Label isRegular>Observation #2</Label>
        </Checkbox>
      </ZendeskField>
    </Container>
  );
};

export { Collection };
