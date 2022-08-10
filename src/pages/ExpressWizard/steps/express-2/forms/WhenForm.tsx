import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { theme } from '@appquality/unguess-design-system';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WaterButton } from 'src/common/components/waterButton';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { WhenStep } from '../when';

export const WhenForm = (props: FormikProps<WizardModel>) => (
  <WhenStep {...props} />
);

export const WhenFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, onNextClick } = props;

  return (
    <>
      <WaterButton
        id="express-wizard-when-back-button"
        isPill
        isBasic
        onClick={onBackClick}
        style={{ marginRight: theme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </WaterButton>
      <WaterButton
        id="express-wizard-when-next-button"
        isPill
        isPrimary
        onClick={onNextClick}
      >
        {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
      </WaterButton>
    </>
  );
};
