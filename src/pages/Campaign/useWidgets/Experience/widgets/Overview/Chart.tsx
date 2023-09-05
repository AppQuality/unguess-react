import {
  Col,
  Grid,
  MD,
  Row,
  SentimentChart,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { useSentiments } from './useSentiments';

const Label = styled.p`
  color: ${({ theme }) => theme.palette.blue[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.space.sm};
`;

const VerticalLabel = styled(Label)`
  transform: rotate(-90deg);
`;

const HorizontalLabel = styled(Label)`
  text-align: center;
`;

const Tooltip = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.sm};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  max-width: 270px;
  white-space: normal;
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
    ...(!isPreview && { showAsCustomer: true }),
  });

  if (!sentiments.length) return null;

  return (
    <Grid>
      <Row>
        <Col
          xs="1"
          style={{ display: 'flex', alignItems: 'center', margin: 0 }}
        >
          <VerticalLabel>
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_SENTIMENT_LABEL')}
          </VerticalLabel>
        </Col>
        <Col xs="11" style={{ margin: 0 }}>
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
            width={`${sentiments.length * 150}px`}
            height="400px"
            margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
            i18n={{
              sentimentsValues: {
                veryNegative: t(
                  '__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_1'
                ),
                negative: t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_2'),
                neutral: t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_3'),
                positive: t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_ITEM_VAL_4'),
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
                    <MD style={{ marginTop: appTheme.space.xs }}>
                      {data?.customData}
                    </MD>
                  )}
                </Tooltip>
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="1" style={{ margin: 0 }} />
        <Col xs="11" style={{ margin: 0 }}>
          <div
            style={{
              width: sentiments.length * 150,
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
      </Row>
    </Grid>
  );
};
