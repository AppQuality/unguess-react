import { Button, getColor } from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { usePlan } from 'src/hooks/usePlan';
import { ExpertReviewWarning } from 'src/pages/Plan/common/ExpertReviewWarning';
import styled from 'styled-components';
import { useModuleTasksContext } from '../context';

const ButtonContainer = styled.div`
  margin: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.xxl};
  padding: ${({ theme }) => theme.space.xs};
  border-left: 4px solid
    ${({ theme }) => getColor(theme.colors.neutralHue, 300)};
`;

const AddTaskButton = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { planId } = useParams();
  const { planComposedStatus } = usePlan(planId);
  const { setModalRef } = useModuleTasksContext();

  return (
    <ButtonContainer>
      <Button
        isBasic
        isPill
        isAccent
        ref={triggerRef}
        onClick={() => setModalRef(triggerRef.current)}
      >
        <Button.StartIcon>
          <PlusIcon />
        </Button.StartIcon>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_BUTTON')}
      </Button>
      {(planComposedStatus === 'PurchasableDraft' ||
        planComposedStatus === 'PrequotedDraft') && (
        <ExpertReviewWarning style={{ marginLeft: appTheme.space.sm }} />
      )}
    </ButtonContainer>
  );
};

export { AddTaskButton };
