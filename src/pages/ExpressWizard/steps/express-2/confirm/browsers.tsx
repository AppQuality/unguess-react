import { Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const Browsers = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  const { values } = props;

  const items = [];

  if (values.withChrome)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_CHROME'));
  if (values.withSafari)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_SAFARI'));
  if (values.withFirefox)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_FIREFOX'));
  if (values.withEdge)
    items.push(t('__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_EDGE'));

  return values.customBrowser ? (
    <>
      {t('__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_BROWSERS')}&nbsp;
      <Span isBold>{items.join(', ')}</Span>.
    </>
  ) : (
    <>{t('__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_BROWSERS_EMPTY')}</>
  );
};
