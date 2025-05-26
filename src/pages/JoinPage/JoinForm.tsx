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
  gap: ${appTheme.space.md};
`;

export const JoinForm = () => {
  const {
    values: { step },
  } = useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  return (
    <>
      <div style={{ marginBottom: appTheme.space.lg }}>
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
          {step === 1 && t('SIGNUP_FORM_STEP_1_DESCRIPTION')}
          {step === 2 && t('SIGNUP_FORM_STEP_2_DESCRIPTION')}
          {step === 3 && t('SIGNUP_FORM_STEP_3_DESCRIPTION')}
        </Paragraph>
      </div>
      <FieldContainer role="tabpanel">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </FieldContainer>
    </>
  );
};
