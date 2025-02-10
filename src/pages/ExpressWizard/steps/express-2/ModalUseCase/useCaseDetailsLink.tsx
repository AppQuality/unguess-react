import {
  Label,
  MediaInput,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

const UseCaseLink = ({
  formikProps,
  useCase,
  useCaseIndex,
}: {
  formikProps: FormikProps<WizardModel>;
  useCase: UseCase;
  useCaseIndex: number;
}) => {
  const { t } = useTranslation();
  const { getFieldProps, validateForm, errors } = formikProps;

  const useCaseErrors =
    errors && errors.use_cases && Array.isArray(errors.use_cases)
      ? (errors.use_cases[useCaseIndex as number] as UseCase)
      : null;

  return (
    <div style={{ marginTop: appTheme.space.lg }}>
      <Label>
        {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_TITLE')}
        <Span style={{ color: appTheme.palette.grey[600] }}>
          {t('__FORM_OPTIONAL_LABEL')}
        </Span>
      </Label>
      <Paragraph style={{ marginBottom: appTheme.space.xs }}>
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
          <InfoIcon style={{ marginRight: appTheme.space.xs }} />
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_MESSAGE')}
        </HelpTextMessage>
      )}
    </div>
  );
};

export { UseCaseLink };
