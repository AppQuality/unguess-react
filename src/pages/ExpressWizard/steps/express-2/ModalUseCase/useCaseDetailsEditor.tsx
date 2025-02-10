import {
  Button,
  Col,
  Editor,
  LG,
  Paragraph,
  Row,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { Notes, NotesTitle } from 'src/pages/ExpressWizard/notesCard';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCaseDropdown } from './useCaseDetailsDropdown';

const UseCaseEditor = ({
  formikProps,
  useCase,
  useCaseIndex,
}: {
  formikProps: FormikProps<WizardModel>;
  useCase: UseCase;
  useCaseIndex: number;
}) => {
  const { t } = useTranslation();
  const { setFieldValue } = formikProps;
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(
    useCase ? useCase.description : ''
  );
  const [editorChars, setEditorChars] = useState(
    useCase ? useCase.description.length : 0
  );

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
    <>
      <UseCaseDropdown
        formikProps={formikProps}
        useCase={useCase}
        useCaseIndex={useCaseIndex}
        setEditorContent={setEditorContent}
        setIsEditing={setIsEditing}
      />
      <div style={{ marginTop: appTheme.space.lg }}>
        <LG>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_TITLE'
          )}
        </LG>
        <Paragraph style={{ marginBottom: appTheme.space.lg }}>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_DESCRIPTION'
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
              isAccent
              style={{ marginTop: appTheme.space.md }}
              onClick={() => setIsEditing(true)}
              isPrimary
            >
              <Button.StartIcon>
                <EditIcon fill={appTheme.palette.white} />
              </Button.StartIcon>
              {t('__EXPRESS_WIZARD_STEP_HOW_EDIT_USE_CASE_CARD_LABEL')}
            </Button>
          </Notes>
        )}
      </div>
      {isEditing && (
        <Row alignItems="center" style={{ marginTop: appTheme.space.lg }}>
          <Col xs="12" sm="6" md="7" lg="8">
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
          <Col textAlign="end" textAlignXs="center">
            <Button
              onClick={() => {
                setEditorContent(useCase ? useCase.description : '');
                setIsEditing(false);
              }}
              isAccent
              isBasic
            >
              Cancel
            </Button>
            <Button onClick={handleSave} isAccent isPrimary>
              Save
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export { UseCaseEditor };
