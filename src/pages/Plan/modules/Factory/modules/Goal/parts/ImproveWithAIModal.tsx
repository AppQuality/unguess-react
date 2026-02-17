import {
  Button,
  IconButton,
  Label,
  Tag,
  TooltipModal,
} from '@appquality/unguess-design-system';
import { ReactComponent as AIIcon } from 'src/assets/icons/ai-fill.svg';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'src/assets/icons/cancel-icon.svg';
import { ReactComponent as ReloadIcon } from 'src/assets/icons/reload-icon.svg';
import { useTranslation } from 'react-i18next';
import { useModuleGoalContext } from '../Context/GoalModalContext';
import { AiErrorAlert } from './AiErrorAlert';
import { AiModalSkeleton } from './AiModalSkeleton';

const TooltipHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const StyledTooltipModalTitle = styled(TooltipModal.Title)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AiModalBody = ({
  isAiLoading,
  aiError,
  aiSuggestion,
}: {
  isAiLoading: boolean;
  aiError: boolean;
  aiSuggestion: string | null;
}) => {
  if (isAiLoading) return <AiModalSkeleton />;
  if (aiError) return <AiErrorAlert />;
  return <div>{aiSuggestion}</div>;
};

const ImproveWithAIModal = () => {
  const {
    modalRef,
    setModalRef,
    aiSuggestion,
    isAiLoading,
    aiError,
    generateSuggestion,
    acceptSuggestion,
  } = useModuleGoalContext();
  const { t } = useTranslation();

  return (
    <TooltipModal
      referenceElement={modalRef}
      onClose={() => setModalRef(null)}
      placement="bottom-end"
      hasArrow={false}
    >
      <StyledTooltipModalTitle>
        <TooltipHeaderContainer>
          <AIIcon />
          <Label>{t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_LABEL')}</Label>
          <Tag>{t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_BETA_TAG')}</Tag>
        </TooltipHeaderContainer>
        <IconButton onClick={() => setModalRef(null)}>
          <CancelIcon />
        </IconButton>
      </StyledTooltipModalTitle>
      <TooltipModal.Body>
        <AiModalBody
          isAiLoading={isAiLoading}
          aiError={aiError}
          aiSuggestion={aiSuggestion}
        />
      </TooltipModal.Body>
      <TooltipModal.Footer>
        <Button isBasic disabled={isAiLoading} onClick={generateSuggestion}>
          <Button.StartIcon>
            <ReloadIcon />
          </Button.StartIcon>
          {t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_REGENERATE_BUTTON')}
        </Button>
        <Button
          isAccent
          isPrimary
          disabled={isAiLoading || !aiSuggestion}
          onClick={acceptSuggestion}
        >
          {t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ACCEPT_BUTTON')}
        </Button>
      </TooltipModal.Footer>
    </TooltipModal>
  );
};

export { ImproveWithAIModal };
