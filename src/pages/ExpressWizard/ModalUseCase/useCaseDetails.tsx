import {
  Message,
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
} from '@appquality/unguess-design-system';
import { Field as DropdownField } from '@zendeskgarden/react-dropdowns';
import { FormikProps } from 'formik';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit-icon.svg';
import { useState } from 'react';
import { UseCase } from 'src/features/express/expressSlice';
import { Notes, NotesTitle } from 'src/pages/ExpressWizard/notesCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { WizardModel } from '../wizardModel';

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledMessage = styled(Message)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.sm};
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
  const { getFieldProps, setFieldValue, values } = formikProps;

  const description =
    values.use_cases && values.use_cases[useCaseIndex]
      ? values.use_cases[useCaseIndex].description
      : '';

  console.log('useCase', description);

  return (
    <>
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
        />
      </StyledFormField>
      <Notes style={{ marginTop: globalTheme.space.lg }}>
        <StyledFormField style={{ marginTop: globalTheme.space.xs }}>
          <Dropdown
            {...(useCase &&
              useCase.functionality && {
                selectedItem: useCase.functionality,
              })}
            onSelect={(item) => {
              setFieldValue(`use_cases[${useCaseIndex}].functionality`, item);
            }}
          >
            <DropdownField>
              <Label>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE'
                )}
                <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
              </Label>
              <Select start={<FunctionalityIcon />}>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
                )}
              </Select>
            </DropdownField>
            <Menu>
              {/* TODO CUP-1019: API /templates */}
              <Item key="" value="">
                adsadsadsa
              </Item>
            </Menu>
          </Dropdown>
        </StyledFormField>
        <StyledFormField style={{ marginTop: globalTheme.space.lg }}>
          <InlineRow>
            <Label>
              {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LOGGED_FIELD_TITLE')}
            </Label>
            <Toggle
              {...(useCase &&
                useCase.logged && {
                  checked: useCase.logged,
                })}
              {...getFieldProps(`use_cases[${useCaseIndex}].logged`)}
            >
              <Label hidden>hidden</Label>
            </Toggle>
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
            onSave={(editor) => {
              console.log('saving...');
              setFieldValue(
                `use_cases[${useCaseIndex}].description`,
                editor.getHTML()
              );
              setIsEditing(false);
            }}
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
      <Notes style={{ marginTop: globalTheme.space.lg }}>
        <NotesTitle>
          <InfoIcon style={{ marginRight: globalTheme.space.xs }} />
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_NOTES_FIELD_TITLE')}
        </NotesTitle>
        <Paragraph>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_NOTES_FIELD_SUBTITLE')}
        </Paragraph>
      </Notes>
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
        />
        <StyledMessage>
          <InfoIcon style={{ marginRight: globalTheme.space.xs }} />
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_MESSAGE')}
        </StyledMessage>
      </StyledFormField>
    </>
  );
};
