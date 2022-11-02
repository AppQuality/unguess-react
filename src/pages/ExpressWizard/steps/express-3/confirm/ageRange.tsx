import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { Trans } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const AgeRange = (props: FormikProps<WizardModel>) => {
  const { values } = props;
  const { age_range: ageRange } = values;

  if (ageRange === 'all')
    return (
      <Trans i18nKey="__EXPRESS_3_WIZARD_STEP_RECAP_WHO_AGE_RANGE_TEXT_ALL">
        Are <Span isBold>evenly distributed</Span> by <Span isBold>age</Span>.
      </Trans>
    );

  // Get range start and end values
  const range = ageRange?.split('-') || [];

  return range.length ? (
    <Trans i18nKey="__EXPRESS_3_WIZARD_STEP_RECAP_WHO_AGE_RANGE_TEXT">
      Are aged between
      <Span isBold>
        {{ age_range_start: range[0] }} and {{ age_range_end: range[1] }}
      </Span>
      years.
    </Trans>
  ) : null;
};
