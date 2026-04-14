import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const getSignupValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('SIGNUP_FORM_EMAIL_INVALID'))
      .required(t('SIGNUP_FORM_EMAIL_REQUIRED'))
      .test(
        'not-work-email',
        t('SIGNUP_FORM_EMAIL_MUST_BE_A_WORK_EMAIL'),
        (value) => {
          if (!value) return true;
          const invalidDomains = [
            'gmail.com',
            'googlemail.com',
            'yahoo.com',
            'yahoo.it',
            'hotmail.com',
            'hotmail.it',
            'outlook.com',
            'outlook.it',
            'live.com',
            'msn.com',
            'icloud.com',
            'me.com',
            'mac.com',
            'aol.com',
            'protonmail.com',
            'Proton: Privacy by default',
            'gmx.com',
            'gmx.net',
            'mail.com',
            'zoho.com',
            'yandex.com',
            'fastmail.com',
            'tiscali.it',
            'virgilio.it',
            'libero.it',
            'inwind.it',
            'blu.it',
            'email.it',
            'tin.it',
            'hotmail.fr',
            'live.fr',
            'outlook.fr',
            'wanadoo.fr',
            'orange.fr',
            'free.fr',
            'sfr.fr',
            'laposte.net',
            'bbox.fr',
            'neuf.fr',
            'numericable.fr',
            'club-internet.fr',
            'noos.fr',
            'aliceadsl.fr',
            'cegetel.net',
          ];
          return !invalidDomains.some((domain) =>
            value.toLowerCase().endsWith(`@${domain}`)
          );
        }
      ),
    password: Yup.string()
      .min(12, t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_12_CHARACTER_LONG'))
      .matches(
        /[a-z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
      )
      .matches(
        /[0-9]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
      )
      .matches(
        /[A-Z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
      )
      .required(t('SIGNUP_FORM_PASSWORD_REQUIRED')),
    termsAccepted: Yup.boolean()
      .oneOf([true], t('SIGNUP_FORM_TERMS_REQUIRED'))
      .required(t('SIGNUP_FORM_TERMS_REQUIRED')),
    privacyAccepted: Yup.boolean()
      .oneOf([true], t('SIGNUP_FORM_PRIVACY_REQUIRED'))
      .required(t('SIGNUP_FORM_PRIVACY_REQUIRED')),
  });
