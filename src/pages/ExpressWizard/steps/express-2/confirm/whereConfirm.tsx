import { Grid, Row, Label, Paragraph } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ReactComponent as WhereIcon } from 'src/assets/icons/step-where-icon.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { Browsers } from './browsers';
import { Devices } from './devices';
import { OperativeSystems } from './operativeSystems';

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const WhereConfirm = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { values } = props;

  return (
    <Grid>
      <Row>
        <WizardCol xs={12} sm={1}>
          <WhereIcon />
        </WizardCol>
        <WizardCol xs={12} sm={11}>
          <StyledLabel>{t('__EXPRESS_WIZARD_STEP_WHERE_LABEL')}</StyledLabel>
          <StyledParagraph>
            <Devices {...props} />
            <br />
            {values.product_type === 'webapp' ? (
              <Browsers {...props} />
            ) : (
              <OperativeSystems {...props} />
            )}
          </StyledParagraph>
        </WizardCol>
      </Row>
    </Grid>
  );
};
