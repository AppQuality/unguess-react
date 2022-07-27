import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { theme } from '@appquality/unguess-design-system';
import { WizardModel } from '../../wizardModel';
import { WaterButton } from '../../../../common/components/waterButton';
import { WizardButtonsProps } from './types';
import { HowStep } from '../how';

export const HowForm = (props: FormikProps<WizardModel>) => (
  <HowStep {...props} />
);

export const HowFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, onNextClick } = props;

  return (
    <>
      <WaterButton
        id="express-wizard-who-back-button"
        isPill
        isBasic
        onClick={onBackClick}
        style={{ marginRight: theme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </WaterButton>
      <WaterButton
        id="express-wizard-who-next-button"
        isPill
        isPrimary
        onClick={onNextClick}
      >
        {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
      </WaterButton>
    </>
  );
};
