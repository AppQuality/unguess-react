import { Theme } from '@appquality/unguess-design-system';
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
  sentencesWrapper: SentencesWrapper,
  sentenceWrapper: SentenceWrapper,
  translationWrapper: TranslationWrapper,
  paragraphWrapper: ParagraphWrapper,
});
