import {
  Grid,
  Row,
  Label,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ReactComponent as WhenIcon } from 'src/assets/icons/step-when-icon.svg';
import { useTranslation, Trans } from 'react-i18next';
import { WizardCol } from '../../wizardCol';
import { WizardModel } from '../../wizardModel';
import { getLanguage } from '../../getLanguage';

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const WhenConfirm = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { values } = props;
  const lang = getLanguage(values.campaign_language || 'en');

  const dateStartText = format(
    values.campaign_date || new Date(),
    'EEEE d MMMM Y',
    { locale: lang.locale }
  );
  const dateEndText = format(
    values.campaign_date_end || new Date(),
    'EEEE d MMMM Y',
    { locale: lang.locale }
  );

  return (
    <Grid>
      <Row>
        <WizardCol xs={12} sm={1}>
          <WhenIcon />
        </WizardCol>
        <WizardCol xs={12} sm={11}>
          <StyledLabel>{t('__EXPRESS_WIZARD_STEP_WHEN_LABEL')}</StyledLabel>
          <StyledParagraph>
            <Trans i18nKey="__EXPRESS_WIZARD_STEP_RECAP_WHEN_CONTENT_TEXT">
              Campaign starts on&nbsp;
              <Span isBold>{{ campaign_date: dateStartText }}</Span> and ends
              on&nbsp;
              <Span isBold>{{ campaign_date_end: dateEndText }}</Span>.
            </Trans>
          </StyledParagraph>
        </WizardCol>
      </Row>
    </Grid>
  );
};
