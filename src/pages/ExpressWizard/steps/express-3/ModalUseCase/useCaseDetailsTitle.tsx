import { InputToggle, Span } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

const UseCaseTitle = ({
  useCase,
  useCaseIndex,
}: {
  useCase: UseCase;
  useCaseIndex: number;
}) => {
  const { t } = useTranslation();
  const { getFieldProps, validateForm, errors } =
    useFormikContext<WizardModel>();

  const useCaseErrors =
    errors && errors.use_cases && Array.isArray(errors.use_cases)
      ? (errors.use_cases[useCaseIndex as number] as UseCase)
      : null;

  return (
    <>
      <InputToggle isFocused>
        <InputToggle.Label>
          {t('__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_TITLE')}
          <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
        </InputToggle.Label>
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
          onBlur={() => {
            validateForm();
          }}
        />
      </InputToggle>
      {useCaseErrors && useCaseErrors?.title && (
        <HelpTextMessage validation="error">
          {t('__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_REQUIRED')}
        </HelpTextMessage>
      )}
    </>
  );
};

export { UseCaseTitle };
