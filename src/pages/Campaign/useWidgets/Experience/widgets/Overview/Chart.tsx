import {
  Col,
  ContainerCard,
  Grid,
  LG,
  MD,
  Row,
  SM,
  SentimentChart,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { useSentiments } from './useSentiments';
import { getSentiment } from './utils';

const Label = styled.p`
  color: ${({ theme }) => theme.palette.blue[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.space.sm};
`;

const VerticalLabel = styled(Label)`
  transform: rotate(-90deg);
  margin-left: -${({ theme }) => theme.space.md};
`;

const HorizontalLabel = styled(Label)`
  text-align: center;
`;

const Tooltip = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.sm};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow()};
  max-width: 270px;
  white-space: normal;
`;

const LegendCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.base * 4}px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  height: 100%;
`;

const SentimentItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.space.sm};

  svg {
    width: ${({ theme }) => theme.space.base * 4}px;
    height: ${({ theme }) => theme.space.base * 4}px;
    margin-right: ${(p) => p.theme.space.xs};
    flex-shrink: 0;
  }
`;

export const Chart = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();

  const { sentiments, isLoading, isError } = useSentiments({
    cid: campaignId.toString(),
    isPreview,
  });

  if (!sentiments.length || isError) return null;

  return (
    <Grid style={{ margin: `${appTheme.space.sm} auto` }}>
      <Row>
        <Col xs="12" style={{ margin: 0 }}>
          <Row>
            <Col
              xs="1"
              style={{ display: 'flex', alignItems: 'center', margin: 0 }}
            >
              <VerticalLabel>
                {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_SENTIMENT_LABEL')}
              </VerticalLabel>
            </Col>
            <Col xs="8" style={{ margin: 0 }}>
              {isLoading ? (
                <Skeleton height="400px" />
              ) : (
                <SentimentChart
                  data={{
                    id: 'sentiment',
                    data: [
                      ...sentiments.map((s) => ({
                        x: s.title,
                        y: s.sentiment,
                        custom_data: s.note,
                      })),
                    ],
                  }}
                  width={`${
                    sentiments.length < 4 ? '100%' : sentiments.length * 200
                  }px`}
                  height="400px"
                  margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
                  i18n={{
                    sentimentsValues: {
                      veryNegative: t(
                        '__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_1'
                      ),
                      negative: t(
                        '__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_2'
                      ),
                      neutral: t(
                        '__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_3'
                      ),
                      positive: t(
                        '__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_4'
                      ),
                      veryPositive: t(
                        '__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_5'
                      ),
                    },
                  }}
                  tooltip={(node) => {
                    const { data, label: cluster } = node;

                    return (
                      <Tooltip>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {data?.icon}
                          <Span
                            isBold
                            style={{
                              marginLeft: appTheme.space.xs,
                              color: appTheme.palette.grey[600],
                            }}
                          >
                            {cluster}
                          </Span>
                        </div>
                        {data?.customData && (
                          <MD
                            style={{
                              marginTop: appTheme.space.xs,
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {data?.customData}
                          </MD>
                        )}
                      </Tooltip>
                    );
                  }}
                />
              )}
            </Col>
            <Col xs="3" style={{ margin: 0 }}>
              <LegendCard>
                <SM
                  style={{
                    color: appTheme.palette.grey[700],
                    marginTop: appTheme.space.sm,
                  }}
                >
                  {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_CARD_PRE_TITLE')}
                </SM>
                <LG
                  style={{
                    margin: `${appTheme.space.xxs} 0`,
                    color: appTheme.palette.blue[600],
                  }}
                  isBold
                >
                  {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_CARD_TITLE')}
                </LG>
                <MD
                  style={{
                    marginBottom: appTheme.space.md,
                    color: appTheme.palette.grey[700],
                  }}
                >
                  {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_CARD_DESCRIPTION')}
                </MD>
                <SentimentItem>{getSentiment(1, t).text}</SentimentItem>
                <SentimentItem>{getSentiment(2, t).text}</SentimentItem>
                <SentimentItem>{getSentiment(3, t).text}</SentimentItem>
                <SentimentItem>{getSentiment(4, t).text}</SentimentItem>
                <SentimentItem style={{ marginBottom: appTheme.space.sm }}>
                  {getSentiment(5, t).text}
                </SentimentItem>
              </LegendCard>
            </Col>
          </Row>
          <Row>
            <Col xs="1" style={{ margin: 0 }} />
            <Col xs="8" style={{ margin: 0 }}>
              <div
                style={{
                  width: `${
                    sentiments.length < 4 ? '100%' : sentiments.length * 200
                  }px`,
                  maxWidth: '100%',
                  marginTop: appTheme.space.md,
                }}
              >
                <HorizontalLabel>
                  {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_USECASE_LABEL', {
                    count: sentiments.length,
                  })}
                </HorizontalLabel>
              </div>
            </Col>
            <Col xs="3" style={{ margin: 0 }} />
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};
