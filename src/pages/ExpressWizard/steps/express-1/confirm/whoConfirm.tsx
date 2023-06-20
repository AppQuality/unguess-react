import {
  Grid,
  Row,
  Label,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { ReactComponent as WhoIcon } from 'src/assets/icons/step-who-icon.svg';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { getLanguage } from 'src/pages/ExpressWizard/getLanguage';

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const WhoConfirm = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { values } = props;
  const lang = getLanguage(values.campaign_language || 'en');

  return (
    <Grid>
      <Row>
        <WizardCol xs={12} sm={1}>
          <WhoIcon />
        </WizardCol>
        <WizardCol xs={12} sm={11}>
          <StyledLabel>{t('__EXPRESS_WIZARD_STEP_WHO_LABEL')}</StyledLabel>
          <StyledParagraph>
            <Trans i18nKey="__EXPRESS_WIZARD_STEP_RECAP_WHO_CONTENT_TEXT">
              Testers speak&nbsp;
              <Span isBold>{{ campaign_language: lang.label }}</Span>.
            </Trans>
          </StyledParagraph>
        </WizardCol>
      </Row>
    </Grid>
  );
};
