import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from '../../wizardModel';

export const OperativeSystems = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  const { values } = props;

  const items = [];

  if (values.isAndroid)
    items.push(t('__EXPRESS_WIZARD_STEP_APP_WHERE_OS_ANDROID_LABEL'));
  if (values.isIOS)
    items.push(t('__EXPRESS_WIZARD_STEP_APP_WHERE_OS_IOS_LABEL'));

  return (
    <>
      {t('__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_OS')}&nbsp;
      <Span isBold>{items.join(', ')}</Span>.
    </>
  );
};
