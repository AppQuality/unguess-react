import joinBg from 'src/assets/join-bg-1.png';
import joingBgwebp from 'src/assets/join-bg-1.webp';
import joinBg2 from 'src/assets/join-bg-2.png';
import joinBg2webp from 'src/assets/join-bg-2.webp';
import joinBg3 from 'src/assets/join-bg-3.png';
import joinBg3webp from 'src/assets/join-bg-3.webp';
import styled from 'styled-components';

export const JoinBackground = styled.div<{ step: number }>`
  width: 100%;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${({ step }) =>
      step === 1 &&
      `
      background-image: url(${joinBg});
      @supports (background-image: url(${joingBgwebp})) {
        background-image: url(${joingBgwebp});
      }
    `}
    ${({ step }) =>
      step === 2 &&
      `
      background-image: url(${joinBg2});
      @supports (background-image: url(${joinBg2webp})) {
        background-image: url(${joinBg2webp});
      }
    `}
    ${({ step }) =>
      step === 3 &&
      `
      background-image: url(${joinBg3});
      @supports (background-image: url(${joinBg3webp})) {
        background-image: url(${joinBg3webp});
      }
    `}
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
`;
