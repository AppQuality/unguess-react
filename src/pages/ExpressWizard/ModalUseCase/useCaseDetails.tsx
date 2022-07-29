import {
  Label,
  theme as globalTheme,
  Span,
  Input,
  Dropdown,
  Select,
  Menu,
  Item,
  MediaInput,
  Paragraph,
  Toggle,
  LG,
  Editor,
  Button,
  Col,
  Row,
} from '@appquality/unguess-design-system';
import { Field as DropdownField } from '@zendeskgarden/react-dropdowns';
import { Field as FormField } from '@zendeskgarden/react-forms';
import { FormikProps } from 'formik';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { useCallback, useState } from 'react';
import { Notes, NotesTitle } from 'src/pages/ExpressWizard/notesCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { WizardModel } from '../wizardModel';
import { UseCase } from '../fields/how';

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const InlineRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  const [isEditing, setIsEditing] = useState(false);
  const { getFieldProps, setFieldValue, validateForm, values, errors } =
    formikProps;
  const description =
    values.use_cases && values.use_cases[useCaseIndex as number]
      ? values.use_cases[useCaseIndex as number].description
      : '';

  const [editorContent, setEditorContent] = useState(description);
  const [editorChars, setEditorChars] = useState(description.length);

  const functionality =
    values.use_cases && values.use_cases[useCaseIndex as number]
      ? values.use_cases[useCaseIndex as number].functionality
      : undefined;

  const [selectedFunc, setSelectedFunc] = useState(functionality);

  const useCaseErrors =
    errors && errors.use_cases && Array.isArray(errors.use_cases)
      ? (errors.use_cases[useCaseIndex as number] as UseCase)
      : null;

  const handleSave = useCallback(() => {
    if (editorChars) {
      setFieldValue(`use_cases[${useCaseIndex}].description`, editorContent);
      setIsEditing(false);
    }
  }, [editorChars]);

  return (
    <>
      {/* Title */}
      <StyledFormField style={{ marginTop: 0 }}>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_TITLE')}
          <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
        </Label>
        <Input
          type="text"
          placeholder={t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_PLACEHOLDER'
          )}
          focusInset
          {...(useCase &&
            useCase.title && {
              value: useCase.title,
            })}
          {...getFieldProps(`use_cases[${useCaseIndex}].title`)}
          {...(useCaseErrors &&
            useCaseErrors?.title && { validation: 'error' })}
          onBlur={() => validateForm()}
        />
        {useCaseErrors && useCaseErrors?.title && (
          <HelpTextMessage validation="error">
            {useCaseErrors?.title}
          </HelpTextMessage>
        )}
      </StyledFormField>

      {/* Dropdown */}
      <Notes style={{ marginTop: globalTheme.space.lg }}>
        <StyledFormField style={{ marginTop: globalTheme.space.xs }}>
          <Dropdown
            selectedItem={selectedFunc}
            onSelect={(item) => {
              setFieldValue(`use_cases[${useCaseIndex}].functionality`, item);
              setSelectedFunc(item);
              validateForm();
            }}
            {...(!selectedFunc && { validation: 'error' })}
          >
            <DropdownField>
              <Label>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE'
                )}
                <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
              </Label>
              <Select start={<FunctionalityIcon />}>
                {selectedFunc ??
                  t(
                    '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
                  )}
              </Select>
            </DropdownField>
            <Menu>
              {/* TODO CUP-1019: API /templates */}
              <Item key="adsadsadsa" value="adsadsadsa">
                adsadsadsa
              </Item>
            </Menu>
          </Dropdown>
          {!selectedFunc && (
            <HelpTextMessage validation="error">
              {useCaseErrors?.functionality}
            </HelpTextMessage>
          )}
        </StyledFormField>
        <StyledFormField style={{ marginTop: globalTheme.space.lg }}>
          <InlineRow>
            <Label>
              {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LOGGED_FIELD_TITLE')}
            </Label>
            <FormField>
              <Toggle
                {...(useCase &&
                  useCase.logged && {
                    checked: useCase.logged,
                  })}
                {...getFieldProps(`use_cases[${useCaseIndex}].logged`)}
              >
                <Label hidden>hidden</Label>
              </Toggle>
            </FormField>
          </InlineRow>
          <Divider
            style={{
              marginTop: globalTheme.space.sm,
              marginBottom: globalTheme.space.md,
            }}
          />
          <InlineRow>
            <Paragraph>
              {t(
                '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LOGGED_FIELD_DESCRIPTION'
              )}
            </Paragraph>
            <InfoIcon className="authentication-info-button" />
          </InlineRow>
        </StyledFormField>
      </Notes>

      {/* Editor */}
      <StyledFormField style={{ marginTop: globalTheme.space.xl }}>
        <DescriptionTitle>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_TITLE'
          )}
        </DescriptionTitle>
        <Paragraph style={{ marginBottom: globalTheme.space.md }}>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_DESCRIPTION'
          )}
        </Paragraph>
        {/* TODO CUP-1062: editor */}
        {isEditing ? (
          <Editor
            key={`editor_${useCaseIndex}`}
            onUpdate={({ editor }) => {
              setEditorChars(editor.storage.characterCount.characters());
              setEditorContent(editor.getHTML());
            }}
            onSave={handleSave}
          >
            {description}
          </Editor>
        ) : (
          <Notes>
            <Editor key={`editor_readonly_${useCaseIndex}`} editable={false}>
              {description}
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
                setEditorContent(description);
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
      <StyledFormField>
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
            {useCaseErrors?.link}
          </HelpTextMessage>
        ) : (
          <HelpTextMessage>
            <InfoIcon style={{ marginRight: globalTheme.space.xs }} />
            {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_MESSAGE')}
          </HelpTextMessage>
        )}
      </StyledFormField>
    </>
  );
};
