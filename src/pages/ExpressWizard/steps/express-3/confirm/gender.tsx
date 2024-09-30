import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const Gender = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { values } = props;
  const { gender } = values;

  if (gender === 'all')
    return (
      <Trans i18nKey="__EXPRESS_3_WIZARD_STEP_RECAP_WHO_GENDER_TEXT_ALL">
        Are <Span isBold>evenly distributed</Span> by <Span isBold>gender</Span>
        .
      </Trans>
    );

  const translatedGender =
    gender === 'male'
      ? t('__EXPRESS_3_WIZARD_STEP_WHO_GENDER_MALE_PLURAL')
      : t('__EXPRESS_3_WIZARD_STEP_WHO_GENDER_FEMALE_PLURAL');

  return (
    <Trans
      i18nKey="__EXPRESS_3_WIZARD_STEP_RECAP_WHO_GENDER_TEXT"
      components={{
        span: <Span isBold />,
      }}
      values={{ gender: translatedGender }}
      default="Are <span>{{gender}}</span>."
    />
  );
};
