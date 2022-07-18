import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { theme } from '@appquality/unguess-design-system';
import { WizardModel } from '../../wizardModel';
import { WaterButton } from '../../../../common/components/waterButton';
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
