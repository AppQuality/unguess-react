import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from '../../wizardModel';
import { WaterButton } from '../../waterButton';
import { WizardButtonsProps } from './types';
import { ConfirmationStep } from '../confirm';
import { WizardSubmit } from '../../wizardSubmit';

export const ConfirmationForm = (props: FormikProps<WizardModel>) => (
  <ConfirmationStep {...props} />
);

export const ConfirmationFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, formikArgs } = props;

  return (
    <>
      <WaterButton isPill isBasic onClick={onBackClick}>
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </WaterButton>
      <WizardSubmit {...formikArgs} />
    </>
  );
};
