import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { Trans } from 'react-i18next';
import { getLanguage } from 'src/pages/ExpressWizard/getLanguage';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const Language = (props: FormikProps<WizardModel>) => {
  const { values } = props;
  const { campaign_language: language } = values;
  const lang = getLanguage(language || 'en');

  return (
    <Trans
      i18nKey="__EXPRESS_4_WIZARD_STEP_RECAP_WHO_CONTENT_TEXT"
      components={{
        span: <Span isBold />,
      }}
      values={{
        spoken_language: lang.label,
      }}
      defaults="Are speaking <span>{{spoken_language}}</span>."
    />
  );
};
