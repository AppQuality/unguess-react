import { styled } from 'styled-components';

export const filtersHeight = 56;

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

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const InsightsDrawer = () => {
  // eslint-disable-next-line no-console
  console.log('InsightsDrawer');

  return (
    <DetailContainer>
      <p>Insight drawer</p>
    </DetailContainer>
  );
};

export { InsightsDrawer };
