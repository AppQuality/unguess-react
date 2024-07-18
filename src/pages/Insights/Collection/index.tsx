import { Checkbox, LG, Label } from '@appquality/unguess-design-system';
import { Field as ZendeskField } from '@zendeskgarden/react-forms';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { InsightFormValues } from '../FormProvider';
import { ClusterCard } from './ClusterCard';
import { ObservationCard } from './ObservationCard';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-gap: 0;
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
            {
              id: 4,
              title: 'Observation #4',
              severity: 2,
              quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur officia, modi, quisquam nam repellendus commodi exercitationem expedita distinctio harum et similique voluptatibus asperiores iusto possimus!',
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
        <ClusterCard
          severity={2}
          observations={[
            {
              id: 1,
              title: 'Observation #1',
              severity: 1,
              quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur officia, modi, quisquam nam repellendus commodi exercitationem expedita distinctio harum et similique voluptatibus asperiores iusto possimus!',
            },
            {
              id: 2,
              title: 'Observation #2',
              severity: 2,
              quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            },
            {
              id: 3,
              title: 'Observation #3',
              severity: 3,
              quote: 'Lorem ipsum dolor sit',
            },
            {
              id: 4,
              title: 'Observation #4',
              severity: 2,
              quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur officia, modi, quisquam nam repellendus commodi exercitationem expedita distinctio harum et similique voluptatibus asperiores iusto possimus!',
            },
            {
              id: 5,
              title: 'Observation #5',
              severity: 2,
              quote:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur officia, modi, quisquam nam repellendus commodi exercitationem expedita distinctio harum et similique voluptatibus asperiores iusto possimus!',
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
        <ObservationCard
          observation={{
            id: 1,
            title: 'observation #1',
            description: 'observation #1 description',
            /** Format: float */
            start: 1,
            /** Format: float */
            end: 3,
            tags: [
              {
                group: {
                  id: 1,
                  name: 'group #1',
                },
                tag: {
                  id: 1,
                  name: 'tag #1',
                  style: '#000000',
                  usageNumber: 1,
                },
              },
              {
                group: {
                  id: 1,
                  name: 'group #1',
                },
                tag: {
                  id: 2,
                  name: 'tag #2',
                  style: '#000000',
                  usageNumber: 1,
                },
              },
              {
                group: {
                  id: 2,
                  name: 'severity',
                },
                tag: {
                  id: 3,
                  name: 'high',
                  style: '#FF0000',
                  usageNumber: 1,
                },
              },
            ],
            quotes: 'lorem ipsum',
            video: {
              id: 1,
              poster: 'https://via.placeholder.com/150',
              url: 'https://via.placeholder.com/150',
              streamUrl: 'https://via.placeholder.com/150',
              tester: {
                id: 1,
                name: "tester's name",
                surname: "tester's surname",
                device: {
                  type: 'smartphone',
                },
              },
            },
            useCase: {
              title: 'use case title',
              description: 'use case description',
            },
          }}
        />
      </Wrapper>
    </Container>
  );
};

export { Collection };
