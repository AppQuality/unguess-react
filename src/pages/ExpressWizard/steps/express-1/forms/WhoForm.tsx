import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { Button } from '@appquality/unguess-design-system';
import { WhoStep } from '../who';

export const WhoForm = (props: FormikProps<WizardModel>) => (
  <WhoStep {...props} />
);

export const WhoFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, onNextClick } = props;

  return (
    <>
      <Button
        id="express-wizard-who-back-button"
        isBasic
        onClick={onBackClick}
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
