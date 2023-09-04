import { TFunction } from 'i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as Sentiment1 } from './assets/sentiment-1.svg';
import { ReactComponent as Sentiment2 } from './assets/sentiment-2.svg';
import { ReactComponent as Sentiment3 } from './assets/sentiment-3.svg';
import { ReactComponent as Sentiment4 } from './assets/sentiment-4.svg';
import { ReactComponent as Sentiment5 } from './assets/sentiment-5.svg';

export const getSentiment = (value: number, t: TFunction) => {
  switch (value) {
    case 1:
      return {
        color: appTheme.palette.red[500],
        text: (
          <>
            <Sentiment1 />{' '}
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_1')}
          </>
        ),
      };
    case 2:
      return {
        color: appTheme.palette.red[500],
        text: (
          <>
            <Sentiment2 />{' '}
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_2')}
          </>
        ),
      };
    case 3:
      return {
        color: appTheme.palette.yellow[500],
        text: (
          <>
            <Sentiment3 />{' '}
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_3')}
          </>
        ),
      };
    case 4:
      return {
        color: appTheme.palette.green[500],
        text: (
          <>
            <Sentiment4 />{' '}
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_4')}
          </>
        ),
      };
    case 5:
      return {
        color: appTheme.palette.green[500],
        text: (
          <>
            <Sentiment5 />{' '}
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_5')}
          </>
        ),
      };

    default:
      return {
        color: appTheme.palette.yellow[500],
        text: '',
      };
  }
};

export const getPercentage = (value: number) => {
  if (value === 3) return 50;

  return (value / 5) * 100;
};
