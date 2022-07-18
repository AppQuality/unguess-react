import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { theme } from '@appquality/unguess-design-system';
import { WizardModel } from '../../wizardModel';
import { WaterButton } from '../../../../common/components/waterButton';
import { WizardButtonsProps } from './types';
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
      <WaterButton
        id="express-wizard-where-back-button"
        isPill
        isBasic
        onClick={onBackClick}
        style={{ marginRight: theme.space.sm }}
      >
        {t('__EXPRESS_WIZARD_BACK_BUTTON_LABEL')}
      </WaterButton>
      <WaterButton
        id="express-wizard-where-next-button"
        isPill
        isPrimary
        onClick={onNextClick}
      >
        {t('__EXPRESS_WIZARD_NEXT_BUTTON_LABEL')}
      </WaterButton>
    </>
  );
};
