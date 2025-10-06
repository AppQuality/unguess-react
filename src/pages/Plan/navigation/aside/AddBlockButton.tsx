import { Button } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CustomFeatureIcon } from 'src/assets/icons/dashboard_customize.svg';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';
import { usePlan } from 'src/hooks/usePlan';
import styled from 'styled-components';
import { ExpertReviewWarning } from '../../common/ExpertReviewWarning';
import { usePlanContext } from '../../context/planContext';
import { getModulesByTab } from '../../modules/Factory';
import { usePlanNavContext } from './context';

const ButtonContainer = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xxs};
  padding-right: ${({ theme }) => theme.space.xxs};
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
        <ExpertReviewWarning
          style={{
            marginTop: appTheme.space.md,
            marginLeft: appTheme.space.sm,
          }}
        />
      )}
    </ButtonContainer>
  );
};

export { AddBlockButton };
