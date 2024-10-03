import { Theme } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import ActiveWrapper from './ActiveWrapper';
import ObservationWrapper from './ObservationWrapper';
import SentenceWrapper from './SentenceWrapper';
import SentencesWrapper from './SentencesWrapper';
import SpeakerWrapper from './SpeakerWrapper';
import TranslationWrapper from './TranslationsWrapper';
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
  sentencesWrapper: SentencesWrapper,
  sentenceWrapper: SentenceWrapper,
  translationWrapper: TranslationWrapper,
});
