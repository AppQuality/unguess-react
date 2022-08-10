import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { theme } from '@appquality/unguess-design-system';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WaterButton } from 'src/common/components/waterButton';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { WizardSubmit } from 'src/pages/ExpressWizard/wizardSubmit';
import { ConfirmationStep } from '../confirm';

export const ConfirmationForm = (props: FormikProps<WizardModel>) => (
  <ConfirmationStep {...props} />
);

export const ConfirmationFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, formikArgs } = props;

  return (
    <>
      <WaterButton
        id="express-wizard-confirm-back-button"
        isPill
        isBasic
        onClick={onBackClick}
        style={{ marginRight: theme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </WaterButton>
      <WizardSubmit {...formikArgs} />
    </>
  );
};
