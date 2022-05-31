import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from '../../wizardModel';

export const ConfirmOutOfScope = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  const { values } = props;

  return values.hasOutOfScope ? (
    <>
      {t('__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_OUT_OF_SCOPE')}&nbsp;
      <Span isBold>{values.outOfScope}</Span>.
    </>
  ) : (
    <>
      {t('__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_OUT_OF_SCOPE_EMPTY')}
    </>
  );
};
