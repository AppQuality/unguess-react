import { XXL, Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CardDivider } from '../cardDivider';
import { WizardModel } from '../wizardModel';

export const WhereWebStep = ({ errors, touched, validateField, validateForm, handleChange, values, ...props }: FormikProps<WizardModel>) => {
    const { t } = useTranslation();


    return (
        <>
          <XXL><Span>{t('__EXPRESS_WIZARD_STEP_WHERE_LABEL')}</Span>{t('__EXPRESS_WIZARD_STEP_WHERE_TITLE')}</XXL>
          <CardDivider />
        </>
        );
};

export const WhereStepValidationSchema = Yup.object().shape({});