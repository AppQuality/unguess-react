import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { WizardButtonsProps } from 'src/pages/ExpressWizard/steps/types';
import { Button } from '@appquality/unguess-design-system';
import { WhereWebStep } from '../whereWeb';
import { WhereAppStep } from '../whereApp';

export const WhereForm = (props: FormikProps<WizardModel>) => {
  const { values } = props;
  return values.product_type === 'webapp' ? (
    <WhereWebStep {...props} />
  ) : (
    <WhereAppStep {...props} />
  );
};

export const WhereFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, onNextClick } = props;

  return (
    <>
      <Button
        id="express-wizard-where-back-button"
        isBasic
        onClick={onBackClick}
        isAccent
        style={{ marginRight: appTheme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </Button>
      <Button
        id="express-wizard-where-next-button"
        isPrimary
        isAccent
        onClick={onNextClick}
      >
        {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
      </Button>
    </>
  );
};
