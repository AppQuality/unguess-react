import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from '../../wizardModel';

export const Devices = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  const { values } = props;

  const items = [];

  if (values.withSmartphone)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_SMARTPHONE'));
  if (values.withTablet)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_TABLET'));
  if (values.withDesktop)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_DESKTOP'));

  return (
    <>
      {t('__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_DEVICES')}&nbsp;
      <Span isBold>{items.join(', ')}</Span>.
    </>
  );
};
