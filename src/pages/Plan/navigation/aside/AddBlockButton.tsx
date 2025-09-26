import {
  Button,
  getColor,
  SM,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import { ReactComponent as CustomFeatureIcon } from 'src/assets/icons/dashboard_customize.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import styled from 'styled-components';
import { usePlanContext } from '../../context/planContext';
import { getModulesByTab } from '../../modules/Factory';
import { usePlanNavContext } from './context';
import { usePlan } from 'src/hooks/usePlan';
import { useParams } from 'react-router-dom';

const ButtonContainer = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xxs};
  padding-right: ${({ theme }) => theme.space.xxs};
`;

const ExpertReviewWarning = styled.div`
  &:before {
    content: '';
    margin-left: ${({ theme }) => theme.space.sm};
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(p) => p.theme.palette.yellow[500]};
  }
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  padding-top: ${({ theme }) => theme.space.md};
  color: ${(p) => getColor(p.theme.colors.warningHue, 700)};
`;

const AddBlockButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setModalRef } = usePlanNavContext();
  const { planId } = useParams();
  const { planComposedStatus } = usePlan(planId);
  const { activeTab } = usePlanContext();
  const availableModules = getModulesByTab(activeTab.name);
  const { currentModules } = useAppSelector((state) => state.planModules);

  const items = availableModules.filter((module_type) => {
    if (currentModules.find((module) => module === module_type)) return false;
    return true;
  });

  return (
    <ButtonContainer>
      <Button
        data-qa="plan_page_button_additem"
        isPrimary={planComposedStatus === 'UnquotedDraft'}
        isPill={false}
        ref={triggerRef}
        onClick={() => setModalRef(triggerRef.current)}
        isStretched
        disabled={
          items.length === 0 ||
          (planComposedStatus !== 'PurchasableDraft' &&
            planComposedStatus !== 'UnquotedDraft' &&
            planComposedStatus !== 'PrequotedDraft')
        }
      >
        <Button.StartIcon>
          {planComposedStatus === 'UnquotedDraft' ? (
            <PlusIcon />
          ) : (
            <CustomFeatureIcon />
          )}
        </Button.StartIcon>
        {planComposedStatus === 'UnquotedDraft'
          ? t('__PLAN_PAGE_ADD_MODULE_BLOCK_BUTTON')
          : t('__PLAN_PAGE_ADD_CUSTOM_FEATURE_BUTTON')}
      </Button>
      {planComposedStatus !== 'UnquotedDraft' && (
        <ExpertReviewWarning>
          <SM as="span">{t('__PLAN_PAGE_EXPERT_REVIEW_WARNING')}</SM>
          <Tooltip
            appendToNode={document.body}
            type="light"
            content={t('__PLAN_PAGE_EXPERT_REVIEW_TOOLTIP_CONTENT')}
          >
            <InfoIcon />
          </Tooltip>
        </ExpertReviewWarning>
      )}
    </ButtonContainer>
  );
};

export { AddBlockButton };
