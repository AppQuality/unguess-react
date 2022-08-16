import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { Trans } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const Gender = (props: FormikProps<WizardModel>) => {
  const { values } = props;
  const { gender } = values;

  if (gender === 'all')
    return (
      <Trans i18nKey="__EXPRESS_3_WIZARD_STEP_RECAP_WHO_GENDER_TEXT_ALL">
        Are <Span isBold>evenly distributed</Span> by <Span isBold>gender</Span>
        .
      </Trans>
    );

  return (
    <Trans i18nKey="__EXPRESS_3_WIZARD_STEP_RECAP_WHO_GENDER_TEXT">
      Are <Span isBold>{{ gender }}</Span>.
    </Trans>
  );
};
