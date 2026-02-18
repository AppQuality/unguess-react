import {
  AccordionNew,
  Button,
  Editor,
  EditorRef,
  FormField,
  IconButton,
  Label,
  SM,
  Span,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as AiPencilIcon } from 'src/assets/icons/ai-test.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { components } from 'src/common/schema';
import { usePostAiJobsMutation } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import useWindowSize from 'src/hooks/useWindowSize';
import { DeleteModuleConfirmationModal } from 'src/pages/Plan/modules/modal/DeleteModuleConfirmationModal';
import styled from 'styled-components';

import {
  ModuleGoalContextProvider,
  useModuleGoalContext,
} from './Context/GoalModalContext';
import { ImproveWithAIModal } from './parts/ImproveWithAIModal';
import { useIconWithValidation } from './useIcon';
import { CommandBar } from './parts/CommandBar';

const StyledInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${appTheme.space.sm};
  gap: ${appTheme.space.xxs};
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: ${({ theme }) => theme.space.xs} 0;
`;
const getWordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

const MIN_WORDS = 4;

const GoalContent = () => {
  const { value, setOutput, remove } = useModule('goal');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const Icon = useIconWithValidation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  const {
    setModalRef,
    setEditorContent,
    editorContent,
    setAiSuggestion,
    setIsAiLoading,
    setAiError,
    aiSuggestion,
    registerGenerateSuggestion,
    registerAcceptSuggestion,
  } = useModuleGoalContext();
  const { width } = useWindowSize();
  const [generateAISuggestion] = usePostAiJobsMutation();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;
  const editorRef = useRef<EditorRef>(null);
  const validation = (
    module: components['schemas']['Module'] & { type: 'goal' }
  ) => {
    let error;
    if (!module.output) {
      error = t('__PLAN_GOAL_SIZE_ERROR_REQUIRED');
    }
    if (module.output.length < 1) {
      error = t('__PLAN_GOAL_SIZE_ERROR_REQUIRED');
    }
    if (module.output.length > 256) {
      error = t('__PLAN_GOAL_SIZE_ERROR_TOO_LONG');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'goal',
    validate: validation,
  });
  const handleBlur = () => {
    validate();
  };
  const [wordCount, setWordCount] = useState(() =>
    getWordCount(value?.output ?? '')
  );
  const isGenerateDisabled = wordCount < MIN_WORDS;
  const handleChange = (content: {
    editor: { getHTML: () => string; getText: () => string };
  }) => {
    const strippedContent = content.editor
      .getHTML()
      .replace(/<[^>]+>/g, '')
      .trim();
    setOutput(strippedContent);
    setWordCount(getWordCount(content.editor.getText()));
    setEditorContent(content.editor.getText());
  };
  const handleAiSuggestion = async () => {
    setModalRef(aiButtonRef.current);
    setIsAiLoading(true);
    setAiSuggestion(null);
    setAiError(false);
    try {
      const response = await generateAISuggestion({
        body: {
          action: 'improve-goal',
          target: 'goal_agent',
          input: editorContent,
        },
      }).unwrap();
      setAiSuggestion(response.output);
    } catch {
      setAiError(true);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    registerGenerateSuggestion(handleAiSuggestion);
  }, [editorContent, registerGenerateSuggestion, handleAiSuggestion]);

  const handleAcceptSuggestion = () => {
    if (!aiSuggestion) return;
    const editor = editorRef.current?.getEditor();
    if (editor) {
      editor.commands.setContent(aiSuggestion);
      setOutput(aiSuggestion);
      setEditorContent(aiSuggestion);
      setWordCount(getWordCount(aiSuggestion));
    }
    setModalRef(null);
  };

  useEffect(() => {
    registerAcceptSuggestion(handleAcceptSuggestion);
  }, [aiSuggestion, registerAcceptSuggestion, handleAcceptSuggestion]);

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };
  return (
    <>
      <AccordionNew
        data-qa="plan_page_module_goal"
        level={3}
        hasBorder
        type={error ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label label={t('__PLAN_PAGE_MODULE_GOAL_TITLE')} />
            {!isMobile && getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t('__PLAN_PAGE_MODULE_GOAL_REMOVE_TOOLTIP_BUTTON')}
                >
                  <IconButton
                    isDanger
                    onClick={(e) => {
                      handleDelete();
                      e.stopPropagation();
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              </AccordionNew.Meta>
            )}
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <div style={{ padding: appTheme.space.xs }}>
              <FormField style={{ marginBottom: appTheme.space.md }}>
                <Label>
                  <Trans i18nKey="__PLAN_PAGE_MODULE_GOAL_LABEL">
                    Which is the objective of the test?
                  </Trans>
                  <Span style={{ color: appTheme.palette.red[700] }}>*</Span>
                </Label>
                <Editor
                  editable={getPlanStatus() === 'draft'}
                  data-qa="goal-input"
                  onUpdate={(content) => {
                    handleChange(content);
                  }}
                  ref={editorRef}
                  placeholderOptions={{
                    placeholder: t('__PLAN_PAGE_MODULE_GOAL_PLACEHOLDER'),
                  }}
                  headerTitle={' '}
                  disableSaveShortcut
                  validation={error ? 'error' : undefined}
                  onBlur={handleBlur}
                  {...(error && { validation: 'error' })}
                >
                  {value?.output}
                </Editor>
                <BarContainer>
                  <CommandBar editorRef={editorRef.current} />
                  <Button
                    isBasic
                    disabled={isGenerateDisabled}
                    ref={aiButtonRef}
                    onClick={handleAiSuggestion}
                  >
                    <Button.StartIcon>
                      <AiPencilIcon />
                    </Button.StartIcon>
                    {t('GENERATE_WITH_AI_CTA_LABEL')}
                  </Button>
                </BarContainer>
                <StyledInfoBox>
                  {error && typeof error === 'string' ? (
                    <>
                      <AlertIcon />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="goal-error"
                      >
                        {error}
                      </SM>
                    </>
                  ) : (
                    <>
                      <InfoIcon />
                      <SM style={{ color: appTheme.palette.grey[600] }}>
                        {t('__PLAN_PAGE_MODULE_GOAL_INFO')}
                      </SM>
                    </>
                  )}
                </StyledInfoBox>
              </FormField>
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      {isOpenDeleteModal && (
        <DeleteModuleConfirmationModal
          onQuit={() => setIsOpenDeleteModal(false)}
          onConfirm={remove}
        />
      )}
      <ImproveWithAIModal />
    </>
  );
};

const Goal = () => (
  <ModuleGoalContextProvider>
    <GoalContent />
  </ModuleGoalContextProvider>
);

export default Goal;
