import {
  Button,
  Col,
  PlanCard,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { ReactComponent as ChevronDownStroke } from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';
import { ReactComponent as ChevronUpStroke } from '@zendeskgarden/svg-icons/src/16/chevron-up-stroke.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { styled } from 'styled-components';
import { CardRowLoading } from '../CardRowLoading';
import { getPlanStatus } from '../hooks/getPlanStatus';
import { useProjectPlans } from '../hooks/useProjectPlans';

const PREVIEW_ITEMS_MAX_SIZE = 3;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const Plans = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const [isPreview, setIsPreview] = useState(true);
  const { items, isLoading, isFetching } = useProjectPlans({
    projectId,
  });

  if (isLoading || isFetching) {
    return <CardRowLoading />;
  }

  if (!items.length) return null;

  const plans = isPreview ? items.slice(0, PREVIEW_ITEMS_MAX_SIZE) : items;

  return (
    <>
      <Row
        alignItems="center"
        style={{
          marginTop: `${appTheme.space.base * 8}px`,
          marginBottom: appTheme.space.xxs,
        }}
      >
        <Col size={12} style={{ marginBottom: 0 }}>
          <SectionTitle
            title={t('_PROJECT_PAGE_PLANS_GROUP_TITLE')}
            subtitle={t('_PROJECT_PAGE_PLANS_GROUP_SUBTITLE')}
          />
        </Col>
      </Row>
      <Separator style={{ margin: `${appTheme.space.md} 0` }} />
      <Row>
        {plans.map((plan) => (
          <Col size={4} xs={12} md={6} lg={4}>
            <PlanCard
              status={getPlanStatus(plan, t).status}
              i18n={{
                statusLabel: getPlanStatus(plan, t).statusLabel,
              }}
              onClick={() => {
                window.location.href = `/plans/${plan.id}`;
              }}
            >
              <PlanCard.ProjectLabel>
                {plan.project.title}
              </PlanCard.ProjectLabel>
              <PlanCard.Title>{plan.title}</PlanCard.Title>
            </PlanCard>
          </Col>
        ))}
      </Row>
      {items.length > PREVIEW_ITEMS_MAX_SIZE && (
        <ButtonContainer>
          <Button
            isBasic
            size="small"
            onClick={() => {
              setIsPreview(!isPreview);
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            <Button.StartIcon>
              {isPreview ? <ChevronDownStroke /> : <ChevronUpStroke />}
            </Button.StartIcon>
            {isPreview
              ? `${t('_PROJECT_PAGE_PLANS_GROUP_SEE_ALL')} (${
                  items.length - PREVIEW_ITEMS_MAX_SIZE
                })`
              : t('_PROJECT_PAGE_PLANS_GROUP_SEE_LESS')}
          </Button>
        </ButtonContainer>
      )}
    </>
  );
};
