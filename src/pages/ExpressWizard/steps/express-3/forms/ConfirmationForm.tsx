import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { WizardSubmit } from 'src/pages/ExpressWizard/wizardSubmit';
import { Button } from '@appquality/unguess-design-system';
import { ConfirmationStep } from '../confirm';

export const ConfirmationForm = (props: FormikProps<WizardModel>) => (
  <ConfirmationStep {...props} />
);

export const ConfirmationFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, formikArgs } = props;

  return (
    <>
      <Button
        id="express-wizard-confirm-back-button"
        isBasic
        onClick={onBackClick}
        isAccent
        style={{ marginRight: appTheme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </Button>
      <WizardSubmit {...formikArgs} />
    </>
  );
};
