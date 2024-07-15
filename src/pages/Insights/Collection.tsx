import { Card, Checkbox, LG, Label } from '@appquality/unguess-design-system';
import { Field as ZendeskField } from '@zendeskgarden/react-forms';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { InsightFormValues } from './FormProvider';
import { ClusterCard } from './ClusterCard';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: ${({ theme }) => theme.space.md};
  blockquote {
    font-style: italic;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.palette.grey[800]};
  }
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
      <Wrapper>
        <ClusterCard
          severity={2}
          observations={[
            {
              id: 1,
              title: 'Observation #1',
              severity: 1,
              quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            },
            {
              id: 2,
              title: 'Observation #2',
              severity: 2,
              quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur officia, modi, quisquam nam repellendus commodi exercitationem expedita distinctio harum et similique voluptatibus asperiores iusto possimus!',
            },
            {
              id: 3,
              title: 'Observation #3',
              severity: 3,
              quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur officia, modi, quisquam nam repellendus commodi',
            },
          ]}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            pariatur officia, modi, quisquam nam repellendus commodi
            exercitationem expedita distinctio harum et similique voluptatibus
            asperiores iusto possimus! Autem aspernatur aut tenetur.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </ClusterCard>
        <Card>
          <blockquote>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </blockquote>
        </Card>
        <Card>
          <blockquote>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            pariatur officia, modi, quisquam nam repellendus commodi
            exercitationem expedita distinctio harum et similique voluptatibus
            asperiores iusto possimus!
          </blockquote>
        </Card>
        <Card>
          <blockquote>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </blockquote>
        </Card>
      </Wrapper>
    </Container>
  );
};

export { Collection };
