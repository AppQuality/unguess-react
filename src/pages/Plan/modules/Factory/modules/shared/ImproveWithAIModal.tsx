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

const StyledTooltipFooter = styled(TooltipModal.Footer)`
  gap: ${({ theme }) => theme.space.xs};
`;

const EMPTY_RESPONSE_ERROR = 'AI Agent returned an empty response.';

const AiModalBody = ({
  isAiLoading,
  aiError,
  aiSuggestion,
}: {
  isAiLoading: boolean;
  aiError: string | null;
  aiSuggestion: string | null;
}) => {
  const { t } = useTranslation();
  if (isAiLoading) return <AiModalSkeleton />;
  if (aiError) {
    const isEmptyResponse = aiError === EMPTY_RESPONSE_ERROR;
    return (
      <AiErrorAlert
        title={
          isEmptyResponse
            ? t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ERROR_TITLE')
            : t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_GENERIC_ERROR_TITLE')
        }
        message={
          isEmptyResponse
            ? t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ERROR_MESSAGE')
            : t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_GENERIC_ERROR_MESSAGE')
        }
      />
    );
  }
  return <div>{aiSuggestion}</div>;
};

export interface ImproveWithAIModalProps {
  modalRef: HTMLButtonElement | null;
  setModalRef: (ref: HTMLButtonElement | null) => void;
  aiSuggestion: string | null;
  isAiLoading: boolean;
  aiError: string | null;
  generateSuggestion: () => void;
  acceptSuggestion: () => void;
}

export const ImproveWithAIModal = ({
  modalRef,
  setModalRef,
  aiSuggestion,
  isAiLoading,
  aiError,
  generateSuggestion,
  acceptSuggestion,
}: ImproveWithAIModalProps) => {
  const { t } = useTranslation();

  return (
    <TooltipModal
      referenceElement={modalRef}
      onClose={() => setModalRef(null)}
      placement="bottom"
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
      <StyledTooltipFooter>
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
      </StyledTooltipFooter>
    </TooltipModal>
  );
};
