import { Paragraph, XL } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { Step1 } from './Steps/Step1';
import { Step2 } from './Steps/Step2';
import { Step3 } from './Steps/Step3';
import { JoinFormValues } from './valuesType';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

const FormContainer = styled.div`
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding: 0 ${(p) => p.theme.space.xxl};
  }
`;

export const JoinForm = () => {
  const {
    values: { step },
  } = useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  return (
    <FormContainer>
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {step === 1 && (
            <Trans
              i18nKey="SIGNUP_FORM_STEP_1_TITLE"
              components={{ br: <br /> }}
            />
          )}
          {step === 2 && t('SIGNUP_FORM_STEP_2_TITLE')}
          {step === 3 && t('SIGNUP_FORM_STEP_3_TITLE')}
        </XL>
        <Paragraph>
          {step === 2 && t('SIGNUP_FORM_STEP_2_DESCRIPTION')}
          {step === 3 && t('SIGNUP_FORM_STEP_3_DESCRIPTION')}
        </Paragraph>
      </div>
      <FieldContainer role="tabpanel" data-qa={`step-${step}`}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </FieldContainer>
    </FormContainer>
  );
};
