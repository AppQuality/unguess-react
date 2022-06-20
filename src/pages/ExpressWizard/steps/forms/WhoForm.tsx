import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { theme } from '@appquality/unguess-design-system';
import { WizardModel } from '../../wizardModel';
import { WaterButton } from '../../../../common/components/waterButton';
import { WizardButtonsProps } from './types';
import { WhoStep } from '../who';

export const WhoForm = (props: FormikProps<WizardModel>) => (
  <WhoStep {...props} />
);

export const WhoFormButtons = (props: WizardButtonsProps) => {
  const { t } = useTranslation();
  const { onBackClick, onNextClick } = props;

  return (
    <>
      <WaterButton
        isPill
        isBasic
        onClick={onBackClick}
        style={{ marginRight: theme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </WaterButton>
      <WaterButton isPill isPrimary onClick={onNextClick}>
        {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
      </WaterButton>
    </>
  );
};
