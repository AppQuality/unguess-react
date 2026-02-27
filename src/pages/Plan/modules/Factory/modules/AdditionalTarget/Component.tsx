import {
  AccordionNew,
  Button,
  Editor,
  EditorRef,
  FormField,
  IconButton,
  Label,
  Notification,
  SM,
  Span,
  Tooltip,
  useToast,
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
  ModuleAdditionalTargetContextProvider,
  useModuleAdditionalTargetContext,
} from './Context/AdditionalTargetModalContext';
import { ImproveWithAIModal } from '../shared/ImproveWithAIModal';
import { useIconWithValidation } from './useIcon';
import { CommandBar } from '../shared/CommandBar';

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

const sanitizeText = (text: string): string =>
  // eslint-disable-next-line no-control-regex
  text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();

const stripHtml = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent ?? div.innerText ?? '';
};

const AdditionalTargetContent = () => {
  const { value, setOutput, remove } = useModule('additional_target');
  const { getPlanStatus } = useModuleConfiguration();
  const { t } = useTranslation();
  const Icon = useIconWithValidation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { addToast } = useToast();
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  const {
    modalRef,
    setModalRef,
    setEditorContent,
    editorContent,
    setAiSuggestion,
    setIsAiLoading,
    setAiError,
    aiSuggestion,
    isAiLoading,
    aiError,
    generateSuggestion,
    acceptSuggestion,
    registerGenerateSuggestion,
    registerAcceptSuggestion,
  } = useModuleAdditionalTargetContext();
  const { width } = useWindowSize();
  const [generateAISuggestion] = usePostAiJobsMutation();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;
  const editorRef = useRef<EditorRef>(null);

  const validation = (
    module: components['schemas']['ModuleAdditionalTarget']
  ) => {
    let error;
    if (module.output.length > 512) {
      error = t('__PLAN_ADDITIONAL_TARGET_ERROR_TOO_LONG');
    }
    return error || true;
  };

  const { error, validate } = useValidation({
    type: 'additional_target',
    validate: validation,
  });

  const handleBlur = () => {
    validate();
  };

  const [wordCount, setWordCount] = useState(() =>
    getWordCount(stripHtml(value?.output ?? ''))
  );
  const isGenerateDisabled =
    wordCount < MIN_WORDS || getPlanStatus() !== 'draft';

  const handleChange = (content: {
    editor: { getHTML: () => string; getText: () => string };
  }) => {
    const htmlContent = content.editor.getHTML();
    const strippedContent = sanitizeText(content.editor.getText());
    setOutput(htmlContent);
    setWordCount(getWordCount(strippedContent));
    setEditorContent(strippedContent);
  };

  const handleAiSuggestion = async () => {
    const editor = editorRef.current?.getEditor();
    const currentContent = editor
      ? sanitizeText(editor.getText())
      : editorContent;
    setModalRef(aiButtonRef.current);
    setIsAiLoading(true);
    setAiSuggestion(null);
    setAiError(null);
    try {
      const response = await generateAISuggestion({
        body: {
          action: 'improve-criteria',
          target: 'criteria_controller_agent',
          input: currentContent,
        },
      }).unwrap();
      setAiSuggestion(response.output);
    } catch (e: any) {
      const message =
        e instanceof Error
          ? e.message
          : e?.data?.message ?? e?.message ?? String(e);
      setAiError(message);
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
      const sanitizedHtml = sanitizeText(aiSuggestion);
      const plainText = sanitizeText(stripHtml(aiSuggestion));
      editor.commands.setContent(sanitizedHtml);
      setOutput(sanitizedHtml);
      setEditorContent(plainText);
      setWordCount(getWordCount(plainText));
    }
    setModalRef(null);
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="success"
          message={t('PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ACCEPT_TOAST')}
          closeText={t(
            'PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ACCEPT_TOAST_CLOSE'
          )}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
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
        data-qa="additional-target-module"
        level={3}
        hasBorder
        type={error ? 'danger' : 'default'}
      >
        <AccordionNew.Section>
          <AccordionNew.Header icon={Icon}>
            <AccordionNew.Label
              label={t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TITLE')}
            />
            {!isMobile && getPlanStatus() === 'draft' && (
              <AccordionNew.Meta>
                <Tooltip
                  placement="start"
                  type="light"
                  size="small"
                  content={t(
                    '__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_REMOVE_TOOLTIP_BUTTON'
                  )}
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
                  <Trans i18nKey="__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TEXTAREA_LABEL">
                    Additional criteria
                  </Trans>
                  <Span style={{ color: appTheme.palette.grey[600] }}>
                    {t('__FORM_OPTIONAL_LABEL')}
                  </Span>
                </Label>
                <div data-qa="additional-target-input">
                  <Editor
                    editable={getPlanStatus() === 'draft'}
                    data-qa="additional-target-input"
                    onUpdate={(content) => {
                      handleChange(content);
                    }}
                    ref={editorRef}
                    placeholderOptions={{
                      placeholder: t(
                        '__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_TEXTAREA_PLACEHOLDER'
                      ),
                    }}
                    headerTitle={' '}
                    disableSaveShortcut
                    validation={error ? 'error' : undefined}
                    onBlur={handleBlur}
                    {...(error && { validation: 'error' })}
                  >
                    {value?.output}
                  </Editor>
                </div>
                <BarContainer>
                  <CommandBar
                    editorRef={editorRef.current}
                    disabled={getPlanStatus() !== 'draft'}
                  />
                  <Tooltip
                    content={
                      isGenerateDisabled
                        ? t(
                            'PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_TOOLTIP_DISABLE_BUTTON'
                          )
                        : t(
                            'PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_TOOLTIP_ENABLE_BUTTON'
                          )
                    }
                    placement="bottom"
                    type="light"
                    size="large"
                    isVisible={getPlanStatus() !== 'draft' ? false : undefined}
                  >
                    <span>
                      <Button
                        isBasic
                        size="small"
                        disabled={isGenerateDisabled}
                        ref={aiButtonRef}
                        onClick={handleAiSuggestion}
                      >
                        <Button.StartIcon>
                          <AiPencilIcon />
                        </Button.StartIcon>
                        {t('GENERATE_WITH_AI_CTA_LABEL')}
                      </Button>
                    </span>
                  </Tooltip>
                </BarContainer>
                <StyledInfoBox>
                  {error && typeof error === 'string' ? (
                    <>
                      <AlertIcon />
                      <SM
                        style={{ color: appTheme.components.text.dangerColor }}
                        data-qa="additional-target-error"
                      >
                        {error}
                      </SM>
                    </>
                  ) : (
                    <>
                      <InfoIcon />
                      <SM style={{ color: appTheme.palette.grey[600] }}>
                        {t('__PLAN_PAGE_MODULE_ADDITIONAL_TARGET_INFO')}
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
      <ImproveWithAIModal
        modalRef={modalRef}
        setModalRef={setModalRef}
        aiSuggestion={aiSuggestion}
        isAiLoading={isAiLoading}
        aiError={aiError}
        generateSuggestion={generateSuggestion}
        acceptSuggestion={acceptSuggestion}
      />
    </>
  );
};

const AdditionalTarget = () => (
  <ModuleAdditionalTargetContextProvider>
    <AdditionalTargetContent />
  </ModuleAdditionalTargetContextProvider>
);

export default AdditionalTarget;
