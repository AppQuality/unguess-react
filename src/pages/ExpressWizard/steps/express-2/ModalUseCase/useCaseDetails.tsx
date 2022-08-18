import {
  Label,
  theme as globalTheme,
  Span,
  Input,
  MediaInput,
  Paragraph,
  Toggle,
  LG,
  Editor,
  Button,
  Col,
  Row,
} from '@appquality/unguess-design-system';
import { Field as FormField } from '@zendeskgarden/react-forms';
import { FormikProps } from 'formik';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { useCallback, useEffect, useState } from 'react';
import { Notes, NotesTitle } from 'src/pages/ExpressWizard/notesCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { UseCaseTemplate } from 'src/features/api/api';
import { useAppSelector } from 'src/app/hooks';
import { getLocalizedStrapiData } from 'src/common/utils';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import i18n from 'i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { emptyUseCase, UseCase } from 'src/pages/ExpressWizard/fields/how';
import { AnimatedContainer } from 'src/common/components/animatedContainer';
import { TemplateDropdown } from './templateDropdown';

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
  const {
    getFieldProps,
    setFieldValue,
    validateForm,
    values,
    errors,
    touched,
  } = formikProps;
  const { expressTypeId } = useAppSelector((state) => state.express);

  const { data } = useGeti18nExpressTypesByIdQuery({
    id: expressTypeId?.toString() || '0',
    populate: {
      localizations: {
        populate: '*',
      },
    },
  });

  const expressData = getLocalizedStrapiData({
    item: data,
    language: i18n.language,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(
    useCase ? useCase.description : ''
  );
  const [editorChars, setEditorChars] = useState(
    useCase ? useCase.description.length : 0
  );
  const [selectedFunc, setSelectedFunc] = useState<UseCaseTemplate | undefined>(
    useCase ? useCase.functionality : undefined
  );

  const useCaseErrors =
    errors && errors.use_cases && Array.isArray(errors.use_cases)
      ? (errors.use_cases[useCaseIndex as number] as UseCase)
      : null;

  const useCaseTouches =
    touched && touched.use_cases && Array.isArray(touched.use_cases)
      ? touched.use_cases[useCaseIndex as number]
      : null;

  const handleSave = useCallback(() => {
    if (editorChars) {
      setFieldValue(`use_cases[${useCaseIndex}].description`, editorContent);
      useCase.description = editorContent;
      setIsEditing(false);
    }
  }, [editorChars]);

  useEffect(() => {
    setSelectedFunc(useCase ? useCase.functionality : undefined);
    setIsEditing(false);
  }, [useCase]);

  const handleDropdownChange = useCallback(
    (item: UseCaseTemplate | undefined) => {
      let isLogged = emptyUseCase.logged;
      let content =
        expressData && expressData.default_use_case_text
          ? expressData.default_use_case_text
          : emptyUseCase.description;

      if (item && item.id !== -1) {
        isLogged = !!item.requiresLogin;
        content = item.content;
      }

      setFieldValue(`use_cases[${useCaseIndex}].logged`, isLogged);
      setFieldValue(`use_cases[${useCaseIndex}].description`, content);
      setFieldValue(`use_cases[${useCaseIndex}].functionality`, item);

      setEditorContent(content);
      useCase.description = content;

      useCase.logged = isLogged;
      useCase.functionality = item;

      setSelectedFunc(item ?? undefined);
      validateForm();
    },
    [selectedFunc]
  );

  return (
    <AnimatedContainer>
      {/* Title */}
      <StyledFormField style={{ marginTop: 0 }}>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_TITLE')}
          <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
        </Label>
        <Input
          type="text"
          key={`use_cases[${useCaseIndex}].title`}
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
          onBlur={() => {
            validateForm();
          }}
        />
        {useCaseErrors && useCaseErrors?.title && (
          <HelpTextMessage validation="error">
            {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_REQUIRED')}
          </HelpTextMessage>
        )}
      </StyledFormField>

      {/* Dropdown */}
      <Notes style={{ marginTop: globalTheme.space.xl }}>
        <StyledFormField style={{ marginTop: globalTheme.space.xs }}>
          <TemplateDropdown
            deviceType={values.product_type}
            selectedItem={selectedFunc}
            onSelect={handleDropdownChange}
          />

          {!selectedFunc && useCaseTouches && useCaseTouches.functionality && (
            <HelpTextMessage validation="error">
              {t(
                '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_FUNCTIONALITY_REQUIRED'
              )}
            </HelpTextMessage>
          )}
        </StyledFormField>

        {/* Logged Toggle */}
        <StyledFormField style={{ marginTop: globalTheme.space.lg }}>
          <InlineRow>
            <Label>
              {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LOGGED_FIELD_TITLE')}
            </Label>
            <FormField>
              <Toggle
                {...(values &&
                  values.use_cases &&
                  values.use_cases[useCaseIndex as number] && {
                    checked: values.use_cases[useCaseIndex as number].logged,
                  })}
                {...getFieldProps(`use_cases[${useCaseIndex}].logged`)}
              >
                <Label hidden>hidden</Label>
              </Toggle>
            </FormField>
          </InlineRow>
          {values &&
          values.use_cases &&
          values.use_cases[useCaseIndex as number] &&
          values.use_cases[useCaseIndex as number].logged ? (
            <>
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
            </>
          ) : null}
        </StyledFormField>
      </Notes>

      {/* Editor */}
      <StyledFormField style={{ marginTop: globalTheme.space.lg }}>
        <DescriptionTitle>
          {t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DESCRIPTION_FIELD_TITLE'
          )}
        </DescriptionTitle>
        <Paragraph style={{ marginBottom: globalTheme.space.lg }}>
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
