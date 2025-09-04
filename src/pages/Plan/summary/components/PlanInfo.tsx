import {
  ContainerCard,
  Label,
  MD,
  Message,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetPlansByPidApiResponse } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import { Notes } from 'src/common/components/NotesCard';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { Description } from './typography/Description';
import { Title } from './typography/Title';

const PlanContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

interface IPlan extends GetPlansByPidApiResponse {
  isPurchasable?: boolean;
}

export const PlanInfo = () => {
  const { planId } = useParams();
  const { t, i18n } = useTranslation();

  const { plan } = usePlan(planId);

  if (!plan) return null;

  if (!plan.price || !plan.from_template) {
    return null;
  }

  return (
    <ContainerCard>
      <Title
        isBold
        style={{
          marginBottom: appTheme.space.xs,
          color: appTheme.palette.grey[800],
        }}
      >
        {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_TITLE')}
      </Title>
      <Divider
        style={{
          marginBottom: appTheme.space.xs,
          marginTop: appTheme.space.sm,
        }}
      />

      <PlanContentDiv>
        <div>
          <MD>Template Type</MD>
          <Label>{plan.from_template.title} </Label>
        </div>
        <div>
          <MD>Starting Price</MD>
          <Label>{plan.price}</Label>
          <Message validation="warning">Price may vary</Message>
        </div>
      </PlanContentDiv>
    </ContainerCard>
  );
};
