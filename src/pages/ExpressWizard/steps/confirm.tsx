import * as Yup from "yup";
import { FormikProps } from "formik";
import { WizardModel } from "../wizardModel";
import { useTranslation, Trans } from "react-i18next";
import { Label, Paragraph, Span, XXL, Card, Col, Grid, Row, theme } from "@appquality/unguess-design-system";
import styled from "styled-components";
import { CardDivider } from "../cardDivider";
import { ReactComponent as WhatIcon } from "src/assets/icons/step-what-icon.svg";
import { ReactComponent as WhereIcon } from "src/assets/icons/step-where-icon.svg";
import { ReactComponent as WhoIcon } from "src/assets/icons/step-who-icon.svg";
import { ReactComponent as WhenIcon } from "src/assets/icons/step-when-icon.svg";
import { ReactComponent as MoreIcon } from "src/assets/icons/step-more-icon.svg";
import { Devices } from "./confirm/devices";
import { Browsers } from "./confirm/browsers";
import { OperativeSystems } from "./confirm/operativeSystems";
import { ConfirmOutOfScope } from "./confirm/confirmOutOfScope";

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-top: ${({ theme }) => theme.space.base}px;
`;

export const ConfirmationStep = (props: FormikProps<WizardModel>) => {
  const { errors, values, setFieldValue, handleChange } = props;

  const { t } = useTranslation();

  return (
    <>
      <StepTitle>
        <Span isBold>{t("__EXPRESS_WIZARD_STEP_RECAP_TITLE")}</Span>
      </StepTitle>
      <Paragraph>{t("__EXPRESS_WIZARD_STEP_RECAP_DESCRIPTION")}</Paragraph>
      <CardDivider />
      <StyledFormField style={{ marginTop: theme.space.base * 10 + "px" }}>
        <StyledCard>
          <Grid>
            <Row>
              <Col xs={1}>
                <WhatIcon />
              </Col>
              <Col>
                <StyledLabel>{t("__EXPRESS_WIZARD_STEP_WHAT_LABEL")}</StyledLabel>
                <StyledParagraph>
                  <Trans i18nKey="__EXPRESS_WIZARD_STEP_RECAP_WHAT_CONTENT_TEXT">
                    Stai lanciando la campagna <Span isBold>{{ campaign_name: values.campaign_name }}</Span> all'interno del progetto <Span isBold>{{ campaign_name: values.campaign_name }}</Span> per <Span isBold>{{ product_type: values.product_type }}</Span>
                  </Trans>
                </StyledParagraph>
              </Col>
            </Row>
          </Grid>
        </StyledCard>
      </StyledFormField>
      <StyledFormField style={{ marginTop: theme.space.base * 7 + "px" }}>
        <StyledCard>
          <Grid>
            <Row>
              <Col xs={1}>
                <WhereIcon />
              </Col>
              <Col>
                <StyledLabel>{t("__EXPRESS_WIZARD_STEP_WHERE_LABEL")}</StyledLabel>
                <StyledParagraph>
                  <Devices {...props} /><br />
                  {values.product_type === "webapp" ? <Browsers {...props} /> : <OperativeSystems {...props} />}<br />
                  <ConfirmOutOfScope {...props} />
                </StyledParagraph>
              </Col>
            </Row>
          </Grid>
        </StyledCard>
      </StyledFormField>
    </>
  );
};

export const ConfirmationValidationSchema = Yup.object().shape({});
