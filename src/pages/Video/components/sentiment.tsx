import { Span } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Sentiment1 } from '../assets/sentiment-1.svg';
import { ReactComponent as Sentiment2 } from '../assets/sentiment-2.svg';
import { ReactComponent as Sentiment3 } from '../assets/sentiment-3.svg';
import { ReactComponent as Sentiment4 } from '../assets/sentiment-4.svg';
import { ReactComponent as Sentiment5 } from '../assets/sentiment-5.svg';

const StyledDiv = styled.div`
  svg {
    width: ${({ theme }) => theme.space.sm};
    height: ${({ theme }) => theme.space.sm};
    margin-right: ${(p) => p.theme.space.xs};
    flex-shrink: 0;
  }
`;

export const getSentiment = (value: number) => {
  const { t } = useTranslation();

  switch (value) {
    case 1:
      return {
        color: appTheme.palette.red[500],
        text: (
          <StyledDiv>
            <Sentiment1 />{' '}
            <Span style={{ whiteSpace: 'nowrap' }}>
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_1')}
            </Span>
          </StyledDiv>
        ),
      };
    case 2:
      return {
        color: appTheme.palette.red[500],
        text: (
          <StyledDiv>
            <Sentiment2 />{' '}
            <Span style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_2')}
            </Span>
          </StyledDiv>
        ),
      };
    case 3:
      return {
        color: '#003A57',
        text: (
          <StyledDiv>
            <Sentiment3 />{' '}
            <Span style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_3')}
            </Span>
          </StyledDiv>
        ),
      };
    case 4:
      return {
        color: appTheme.palette.green[500],
        text: (
          <StyledDiv>
            <Sentiment4 />{' '}
            <Span style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_4')}
            </Span>
          </StyledDiv>
        ),
      };
    case 5:
      return {
        color: appTheme.palette.green[500],
        text: (
          <StyledDiv>
            <Sentiment5 />{' '}
            <Span style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_5')}
            </Span>
          </StyledDiv>
        ),
      };

    default:
      return {
        color: appTheme.palette.yellow[500],
        text: '',
      };
  }
};
