import { Theme } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import ActiveWrapper from './ActiveWrapper';
import ObservationWrapper from './ObservationWrapper';
import SpeakerWrapper from './SpeakerWrapper';
import WordWrapper from './WordWrapper';

export const TranscriptTheme = Theme.configure({
  speakerWrapper: SpeakerWrapper,
  activeWrapper: ActiveWrapper,
  wordWrapper: WordWrapper,
  observationWrapper: ObservationWrapper,
  searchStyleWrapper: styled.div`
    .search-result {
      background-color: ${({ theme }) => theme.palette.product.talk};
    }
  `,
});
