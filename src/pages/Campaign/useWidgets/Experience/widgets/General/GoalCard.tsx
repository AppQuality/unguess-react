import {
  ContainerCard,
  MD,
  Row,
  Col,
  getColor,
  Accordion,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { Divider } from 'src/common/components/divider';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import { ReactComponent as TargetIcon } from './assets/target.svg';
import { CircleList } from './List';

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
    <WidgetSpecialCard>
      <WidgetSpecialCard.Meta justifyContent="space-between">
        <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
          {t('__CAMPAIGN_PAGE_GOAL_CARD_TITLE')}
        </MD>
      </WidgetSpecialCard.Meta>
      <Divider />
      <CardContent>
        <Goal>
          <Row alignItems="center">
            <Col xs={12} sm="auto" alignSelf="start" style={{ margin: 0 }}>
              <TargetIcon />
            </Col>
            <Col xs={12} sm={10} alignSelf="start" style={{ margin: 0 }}>
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
        </Goal>
      </CardContent>

      <Divider />
      <Accordion level={4}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label
              style={{ padding: 0, color: appTheme.palette.grey[800] }}
            >
              {t('__CAMPAIGN_PAGE_UX_QUESTION_ACCORDION_TITLE')}
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel style={{ padding: 0 }}>
            <CircleList>
              {data.questions.map((question) => (
                <CircleList.Item>
                  <MD isBold>{question.text}</MD>
                </CircleList.Item>
              ))}
            </CircleList>
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </WidgetSpecialCard>
  );
};
