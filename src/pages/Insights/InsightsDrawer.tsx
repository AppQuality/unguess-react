import { useFormikContext } from 'formik';
import { styled } from 'styled-components';
import { Insight } from './Insight';
import { InsightFormValues } from './FormProvider';

const DetailContainer = styled.div<{
  isFetching?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: ${({ theme }) => theme.space.md};

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const InsightsDrawer = () => {
  const { values } = useFormikContext<InsightFormValues>();

  // eslint-disable-next-line no-console
  console.log(values);

  return (
    <DetailContainer>
      <Insight
        insight={{
          id: 1,
          title: 'Insight #1',
          severity: 1,
          observations: [
            {
              id: 1,
              title: 'Observation #1',
              severity: 1,
              quotes: '',
            },
          ],
        }}
      />
      <Insight
        insight={{
          id: 2,
          title: 'Insight #2',
          severity: 1,
          observations: [],
        }}
      />
    </DetailContainer>
  );
};

export { InsightsDrawer };
