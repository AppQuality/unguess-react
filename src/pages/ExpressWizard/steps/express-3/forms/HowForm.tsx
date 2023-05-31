import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { Button } from '@appquality/unguess-design-system';
import { HowStep } from '../how';

export const HowForm = (props: FormikProps<WizardModel>) => (
  <HowStep {...props} />
);

export const HowFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, onNextClick } = props;

  return (
    <>
      <Button
        id="express-wizard-who-back-button"
        isBasic
        onClick={onBackClick}
        isAccent
        style={{ marginRight: appTheme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </Button>
      <Button
        id="express-wizard-who-next-button"
        isPrimary
        isAccent
        onClick={onNextClick}
      >
        {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
      </Button>
    </>
  );
};
