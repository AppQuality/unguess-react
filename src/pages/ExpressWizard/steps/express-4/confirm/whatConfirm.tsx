import {
  Grid,
  Row,
  Label,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import { ReactComponent as WhatIcon } from 'src/assets/icons/step-what-icon.svg';
import { useTranslation, Trans } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { WizardCol } from 'src/pages/ExpressWizard/wizardCol';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const WhatConfirm = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const { project } = useAppSelector((state) => state.express);
  const { values } = props;

  const productType =
    values.product_type === 'webapp'
      ? t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_WEBAPP_LABEL')
      : t('__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_MOBILEAPP_LABEL');

  return (
    <Grid>
      <Row>
        <WizardCol xs={12} sm={1}>
          <WhatIcon />
        </WizardCol>
        <WizardCol xs={12} sm={11}>
          <StyledLabel>{t('__EXPRESS_WIZARD_STEP_WHAT_LABEL')}</StyledLabel>
          <StyledParagraph>
            <Trans
              i18nKey="__EXPRESS_WIZARD_STEP_RECAP_WHAT_CONTENT_TEXT"
              components={{
                span: <Span isBold />,
              }}
              values={{
                campaign_name: values.campaign_name,
                project_name: project?.name,
                product_type: productType,
              }}
              default="Stai lanciando la campagna <span>{{ campaign_name }}</span> all'interno del progetto <span>{{ project_name }}</span> per <span>{{ product_type }}</span>."
            />
          </StyledParagraph>
        </WizardCol>
      </Row>
    </Grid>
  );
};
