import {
  AccordionNew,
  Col,
  ContainerCard,
  Grid,
  MD,
  Row,
  getColor,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import styled from 'styled-components';
import { CircleList } from './List';
import { ReactComponent as TargetIcon } from './assets/target.svg';

const CardContent = styled.div`
  padding: ${({ theme }) => theme.space.base * 2}px 0;
`;

const Goal = styled(ContainerCard)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.base * 3}px;
  width: 100%;
`;

export const GoalCard = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
    ...(!isPreview && { showAsCustomer: true }),
  });

  if (isLoading || isFetching || isError || !data) return <div>loading...</div>;

  return (
    <WidgetSpecialCard style={{ height: 'auto' }}>
      <WidgetSpecialCard.Meta justifyContent="space-between">
        <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
          {t('__CAMPAIGN_PAGE_GOAL_CARD_TITLE')}
        </MD>
      </WidgetSpecialCard.Meta>
      <Divider />
      <CardContent>
        <Goal>
          <Grid>
            <Row alignItems="center">
              <Col xs={12} sm="auto" alignSelf="start" style={{ margin: 0 }}>
                <TargetIcon />
              </Col>
              <Col xs={12} sm={9} alignSelf="start" style={{ margin: 0 }}>
                <WidgetSpecialCard.Header
                  style={{ marginTop: appTheme.space.xxs }}
                >
                  <WidgetSpecialCard.Header.Label>
                    {t('__CAMPAIGN_PAGE_GOAL_CARD_PRE_LABEL')}
                  </WidgetSpecialCard.Header.Label>
                  <WidgetSpecialCard.Header.Title>
                    {data.goal}
                  </WidgetSpecialCard.Header.Title>
                </WidgetSpecialCard.Header>
              </Col>
            </Row>
          </Grid>
        </Goal>
      </CardContent>

      <Divider />
      <AccordionNew level={4}>
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t('__CAMPAIGN_PAGE_UX_QUESTION_ACCORDION_TITLE')}
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <CircleList>
              {data.questions &&
                data.questions.length > 0 &&
                data.questions.map((question) => (
                  <CircleList.Item>
                    <MD isBold>{question.text}</MD>
                  </CircleList.Item>
                ))}
            </CircleList>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </WidgetSpecialCard>
  );
};
