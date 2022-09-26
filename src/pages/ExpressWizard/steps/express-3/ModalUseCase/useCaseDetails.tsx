import {
  Label,
  theme as globalTheme,
  Span,
  MediaInput,
  Paragraph,
  LG,
  Editor,
  Button,
  Col,
  Row,
  InputToggle,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { useCallback, useEffect, useState } from 'react';
import { Notes, NotesTitle } from 'src/pages/ExpressWizard/notesCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { AnimatedContainer } from 'src/common/components/animatedContainer';

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const DescriptionTitle = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const UseCaseDetails = ({
  formikProps,
  useCase,
  useCaseIndex,
}: {
  formikProps: FormikProps<WizardModel>;
  useCase: UseCase;
  useCaseIndex: number;
}) => {
  const { t } = useTranslation();
  const { getFieldProps, setFieldValue, validateForm, errors } = formikProps;

  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(
    useCase ? useCase.description : ''
  );
  const [editorChars, setEditorChars] = useState(
    useCase ? useCase.description.length : 0
  );

  const [showLabel, setShowLabel] = useState<boolean>(false);

  const useCaseErrors =
    errors && errors.use_cases && Array.isArray(errors.use_cases)
      ? (errors.use_cases[useCaseIndex as number] as UseCase)
      : null;

  const handleSave = useCallback(() => {
    if (editorChars) {
      setFieldValue(`use_cases[${useCaseIndex}].description`, editorContent);
      useCase.description = editorContent;
      setIsEditing(false);
    }
  }, [editorChars, editorContent]);

  useEffect(() => {
    setIsEditing(false);
  }, [useCase]);

  return (
    <AnimatedContainer>
      {/* Title */}
      <StyledFormField style={{ marginTop: 0 }}>
        <InputToggle.Label style={{ opacity: showLabel ? 1 : 0 }}>
          {t('__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_TITLE')}
          <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
        </InputToggle.Label>
        <InputToggle isFocused style={{ color: globalTheme.palette.grey[800] }}>
          <InputToggle.Item
            key={`use_cases[${useCaseIndex}].title`}
            textSize="xxl"
            placeholder={t(
              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_PLACEHOLDER'
            )}
            {...(useCase &&
              useCase.title && {
                value: useCase.title,
              })}
            {...getFieldProps(`use_cases[${useCaseIndex}].title`)}
            {...(useCaseErrors &&
              useCaseErrors?.title && { validation: 'error' })}
            onFocus={() => {
              setShowLabel(true);
            }}
            onBlur={() => {
              validateForm();
              setShowLabel(false);
            }}
          />
        </InputToggle>
        {useCaseErrors && useCaseErrors?.title && (
          <HelpTextMessage validation="error">
            {t('__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_REQUIRED')}
          </HelpTextMessage>
        )}
      </StyledFormField>

      {/* Editor */}
      <StyledFormField style={{ marginTop: globalTheme.space.xl }}>
        <DescriptionTitle>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_INSTRUCTIONS_FIELD_TITLE'
          )}
        </DescriptionTitle>
        <Paragraph style={{ marginBottom: globalTheme.space.md }}>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_INSTRUCTIONS_FIELD_DESCRIPTION'
          )}
        </Paragraph>
        {isEditing ? (
          <Editor
            key={`use_cases[${useCaseIndex}].description`}
            onUpdate={({ editor }) => {
              setEditorChars(editor.storage.characterCount.characters());
              setEditorContent(editor.getHTML());
            }}
            hasInlineMenu
            onSave={handleSave}
          >
            {useCase ? useCase.description : ''}
          </Editor>
        ) : (
          <Notes>
            <Editor key={Math.random()} editable={false}>
              {useCase ? useCase.description : ''}
            </Editor>
            <Button
              themeColor={globalTheme.colors.accentHue}
              style={{ marginTop: globalTheme.space.md }}
              onClick={() => setIsEditing(true)}
              isPrimary
              isPill
            >
              <Button.StartIcon>
                <EditIcon fill={globalTheme.palette.white} />
              </Button.StartIcon>
              {t('__EXPRESS_WIZARD_STEP_HOW_EDIT_USE_CASE_CARD_LABEL')}
            </Button>
          </Notes>
        )}
      </StyledFormField>
      {isEditing && (
        <Row alignItems="center" style={{ marginTop: globalTheme.space.lg }}>
          <Col sm="6" md="8" lg="9">
            {!editorChars ? (
              <Notes hasIcon validation="error">
                <InfoIcon />
                <NotesTitle>
                  {t(
                    '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_ERROR_TITLE'
                  )}
                </NotesTitle>
                <Paragraph>
                  {t(
                    '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_ERROR_SUBTITLE'
                  )}
                </Paragraph>
              </Notes>
            ) : (
              <Notes hasIcon>
                <InfoIcon />
                <NotesTitle>
                  {t(
                    '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_NOTES_FIELD_TITLE'
                  )}
                </NotesTitle>
                <Paragraph>
                  {t(
                    '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_NOTES_FIELD_SUBTITLE'
                  )}
                </Paragraph>
              </Notes>
            )}
          </Col>
          <Col textAlign="end">
            <Button
              onClick={() => {
                setEditorContent(useCase ? useCase.description : '');
                setIsEditing(false);
              }}
              themeColor={globalTheme.colors.accentHue}
              isBasic
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              themeColor={globalTheme.colors.accentHue}
              isPill
              isPrimary
            >
              Save
            </Button>
          </Col>
        </Row>
      )}

      {/* Link */}
      <StyledFormField style={{ marginTop: globalTheme.space.lg }}>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_TITLE')}
          <Span style={{ color: globalTheme.palette.grey[600] }}>
            {t('__FORM_OPTIONAL_LABEL')}
          </Span>
        </Label>
        <Paragraph style={{ marginBottom: globalTheme.space.xs }}>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_SUBTITLE')}
        </Paragraph>
        <MediaInput
          start={<LinkIcon />}
          type="text"
          placeholder={t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_PLACEHOLDER'
          )}
          focusInset
          {...(useCase &&
            useCase.link && {
              value: useCase.link,
            })}
          {...getFieldProps(`use_cases[${useCaseIndex}].link`)}
          {...(useCaseErrors && useCaseErrors?.link && { validation: 'error' })}
          onBlur={() => validateForm()}
        />
        {useCaseErrors && useCaseErrors?.link ? (
          <HelpTextMessage validation="error">
            {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_INVALID')}
          </HelpTextMessage>
        ) : (
          <HelpTextMessage>
            <InfoIcon style={{ marginRight: globalTheme.space.xs }} />
            {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_MESSAGE')}
          </HelpTextMessage>
        )}
      </StyledFormField>
    </AnimatedContainer>
  );
};
