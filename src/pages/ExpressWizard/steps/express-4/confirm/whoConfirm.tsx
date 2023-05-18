import { Grid, Row, Label, Paragraph } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ReactComponent as WhoIcon } from 'src/assets/icons/step-who-icon.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { AgeRange } from './ageRange';
import { Gender } from './gender';
import { Digitalization } from './digitalization';

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const WhoConfirm = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  return (
    <Grid>
      <Row>
        <WizardCol xs={12} sm={1}>
          <WhoIcon />
        </WizardCol>
        <WizardCol xs={12} sm={11}>
          <StyledLabel>{t('__EXPRESS_WIZARD_STEP_WHO_LABEL')}</StyledLabel>
          <StyledParagraph>
            {t('__EXPRESS_4_WIZARD_STEP_CONFIRM_WHO_TEXT')}:
            <br />
            <AgeRange {...props} />
            <br />
            <Gender {...props} />
            <br />
            <Digitalization {...props} />
          </StyledParagraph>
        </WizardCol>
      </Row>
    </Grid>
  );
};
