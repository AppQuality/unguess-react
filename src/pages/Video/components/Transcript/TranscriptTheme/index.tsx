import { Theme } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import ActiveWrapper from './ActiveWrapper';
import ObservationWrapper from './ObservationWrapper';
import ParagraphWrapper from './ParagraphWrapper';
import SentencesWrapper from './SentencesWrapper';
import SentenceWrapper from './SentenceWrapper';
import SentimentWrapper from './SentimentWrapper';
import SpeakerWrapper from './SpeakerWrapper';
import TranslationWrapper from './TranslationsWrapper';

export const TranscriptTheme = Theme.configure({
  speakerWrapper: SpeakerWrapper,
  activeWrapper: ActiveWrapper,
  observationWrapper: ObservationWrapper,
  sentimentWrapper: SentimentWrapper,
  searchStyleWrapper: styled.div`
    .search-result {
      background-color: ${({ theme }) => theme.palette.product.talk};
    }
    word {
      display: inline-block;
      font-size: ${({ theme }) => theme.fontSizes.md};
      position: relative;
      color: ${({ theme }) => theme.palette.grey[700]};
      line-height: 2;
    }
  `,
  sentencesWrapper: SentencesWrapper,
  sentenceWrapper: SentenceWrapper,
  translationWrapper: TranslationWrapper,
  paragraphWrapper: ParagraphWrapper,
});
