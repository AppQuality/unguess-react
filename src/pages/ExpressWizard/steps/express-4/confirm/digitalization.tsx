import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { Trans } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const Digitalization = (props: FormikProps<WizardModel>) => {
  const { values } = props;
  const { digital_literacy: digitalLiteracy } = values;

  switch (digitalLiteracy) {
    case 'expert':
      return (
        <Trans i18nKey="__EXPRESS_4_WIZARD_STEP_RECAP_WHO_DIGITALIZATION_TEXT_EXPERT">
          Have an <Span isBold>high level</Span> of{' '}
          <Span isBold>digital literacy</Span>.
        </Trans>
      );
    case 'intermediate':
      return (
        <Trans i18nKey="__EXPRESS_4_WIZARD_STEP_RECAP_WHO_DIGITALIZATION_TEXT_INTERMEDIATE">
          Have a <Span isBold>medium level</Span> of{' '}
          <Span isBold>digital literacy</Span>.
        </Trans>
      );
    case 'beginner':
      return (
        <Trans i18nKey="__EXPRESS_4_WIZARD_STEP_RECAP_WHO_DIGITALIZATION_TEXT_BEGINNER">
          Have a <Span isBold>low level</Span> of{' '}
          <Span isBold>digital literacy</Span>.
        </Trans>
      );
    default:
      return (
        <Trans i18nKey="__EXPRESS_4_WIZARD_STEP_RECAP_WHO_DIGITALIZATION_TEXT_ALL">
          Are <Span isBold>evenly distributed</Span> by{' '}
          <Span isBold>digital literacy</Span>.
        </Trans>
      );
  }
};
