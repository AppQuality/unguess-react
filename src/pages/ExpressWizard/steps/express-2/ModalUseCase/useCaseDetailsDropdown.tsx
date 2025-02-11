import {
  FormField,
  Label,
  Paragraph,
  Toggle,
} from '@appquality/unguess-design-system';
import { FormikProps, useFormikContext } from 'formik';
import i18n from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { Divider } from 'src/common/components/divider';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { getLocalizedStrapiData } from 'src/common/utils';
import { UseCaseTemplate } from 'src/features/api/api';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import { UseCase, emptyUseCase } from 'src/pages/ExpressWizard/fields/how';
import { Notes } from 'src/pages/ExpressWizard/notesCard';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';
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

const UseCaseDropdown = ({
  useCase,
  useCaseIndex,
  setEditorContent,
  setIsEditing,
}: {
  useCase: UseCase;
  useCaseIndex: number;
  setEditorContent: (content: string) => void;
  setIsEditing: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { getFieldProps, setFieldValue, validateForm, values } =
    useFormikContext<WizardModel>();
  const { expressTypeId } = useAppSelector((state) => state.express);

  const [selectedFunc, setSelectedFunc] = useState<UseCaseTemplate | undefined>(
    useCase ? useCase.functionality : undefined
  );

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

  useEffect(() => {
    setSelectedFunc(useCase ? useCase.functionality : undefined);
    setIsEditing(false);
  }, [useCase]);

  return (
    <Notes style={{ marginTop: appTheme.space.xl }}>
      <StyledFormField style={{ marginTop: appTheme.space.xs }}>
        <TemplateDropdown
          deviceType={values.product_type}
          selectedItem={selectedFunc}
          onSelect={handleDropdownChange}
        />

        {!selectedFunc && (
          <HelpTextMessage validation="error">
            {t(
              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_FUNCTIONALITY_REQUIRED'
            )}
          </HelpTextMessage>
        )}
      </StyledFormField>

      <StyledFormField style={{ marginTop: appTheme.space.lg }}>
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
                marginTop: appTheme.space.sm,
                marginBottom: appTheme.space.md,
              }}
            />
            <div>
              <InfoIcon className="authentication-info-button" />
              <Paragraph>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LOGGED_FIELD_DESCRIPTION'
                )}
              </Paragraph>
            </div>
          </>
        ) : null}
      </StyledFormField>
    </Notes>
  );
};

export { UseCaseDropdown };
