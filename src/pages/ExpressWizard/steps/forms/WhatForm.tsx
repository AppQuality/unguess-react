import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from '../../wizardModel';
import { WhatStep } from '../what';
import { WaterButton } from '../../waterButton';
import { WizardButtonsProps } from './types';

export const WhatForm = (props: FormikProps<WizardModel>) => (
  <WhatStep {...props} />
);

export const WhatFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onNextClick } = props;

  return (
    <WaterButton isPill isPrimary onClick={onNextClick}>
      {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
    </WaterButton>
  );
};
