import {
  ContainerCard,
  MD,
  Row,
  Col,
  SpecialCard,
  getColor,
  Accordion,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { Divider } from 'src/common/components/divider';
import { ReactComponent as TargetIcon } from './assets/target.svg';
import { CircleList } from './List';

const WidgetCard = styled(SpecialCard)`
  cursor: default;
  &:hover {
    box-shadow: none;
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.space.base * 2}px 0;
`;

const Goal = styled(ContainerCard)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.base * 3}px;
  width: 100%;
`;

export const GoalCard = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
  });

  if (isLoading || isFetching || isError || !data) return <div>loading...</div>;

  return (
    <WidgetCard title={t('__CAMPAIGN_PAGE_GOAL_CARD_TITLE')}>
      <WidgetCard.Meta justifyContent="space-between">
        <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
          {t('__CAMPAIGN_PAGE_GOAL_CARD_TITLE')}
        </MD>
      </WidgetCard.Meta>
      <Divider />
      <CardContent>
        <Goal>
          <Row alignItems="center">
            <Col xs={12} sm="auto" alignSelf="start" style={{ margin: 0 }}>
              <TargetIcon />
            </Col>
            <Col xs={12} sm={10} alignSelf="start" style={{ margin: 0 }}>
              <WidgetCard.Header style={{ marginTop: appTheme.space.xxs }}>
                <WidgetCard.Header.Label>
                  {t('__CAMPAIGN_PAGE_GOAL_CARD_PRE_LABEL')}
                </WidgetCard.Header.Label>
                <WidgetCard.Header.Title>{data.goal}</WidgetCard.Header.Title>
              </WidgetCard.Header>
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
    </WidgetCard>
  );
};
