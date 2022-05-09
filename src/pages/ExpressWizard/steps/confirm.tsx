import * as Yup from "yup";
import { FormikProps } from "formik";
import { WizardModel } from "../wizardModel";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { Label, Paragraph, Span, XXL, Card, Col, Grid, Row, theme, Message } from "@appquality/unguess-design-system";
import styled from "styled-components";
import { CardDivider } from "../cardDivider";
import { ReactComponent as WhatIcon } from "src/assets/icons/step-what-icon.svg";
import { ReactComponent as WhereIcon } from "src/assets/icons/step-where-icon.svg";
import { ReactComponent as WhoIcon } from "src/assets/icons/step-who-icon.svg";
import { ReactComponent as WhenIcon } from "src/assets/icons/step-when-icon.svg";
import { ReactComponent as MoreIcon } from "src/assets/icons/step-more-icon.svg";
import { ReactComponent as InfoIcon } from "src/assets/icons/info-icon.svg";
import { Devices } from "./confirm/devices";
import { Browsers } from "./confirm/browsers";
import { OperativeSystems } from "./confirm/operativeSystems";
import { ConfirmOutOfScope } from "./confirm/confirmOutOfScope";
import { Textarea } from "@zendeskgarden/react-forms";
import { useAppSelector } from "src/app/hooks";
import { format } from "date-fns";
import { enGB, it } from 'date-fns/locale';

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

const StyledTextarea = styled(Textarea)`
  margin-top: ${({ theme }) => theme.space.base * 2}px;
`;

const TextareaNote = styled(Paragraph)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.2;

  svg {
    margin-right: ${({ theme }) => theme.space.base * 2}px;
  }
`;

export const ConfirmationStep = (props: FormikProps<WizardModel>) => {
  const { values } = props;

  const { project } = useAppSelector((state) => state.express);

  let lang
  let date_locale;
  switch (values.campaign_language) {
    case "en":
      lang = t("English");
      date_locale = enGB;
      break;
    case "it":
      lang = t("Italian");
      date_locale = it;
      break;
    default:
      lang = t("English");
      date_locale = enGB;
      break;
  }

  let productType = (values.product_type === "webapp" ? t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_WEBAPP_LABEL") : t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_MOBILEAPP_LABEL"));

  let date_start_text = format(values.campaign_date || new Date(), "EEEE d MMMM Y", {locale: date_locale});
  let date_end_text = format(values.campaign_date_end || new Date(), "EEEE d MMMM Y", {locale: date_locale});

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
                    Stai lanciando la campagna <Span isBold>{{ campaign_name: values.campaign_name }}</Span> all'interno del progetto <Span isBold>{{ project_name: project?.name }}</Span> per <Span isBold>{{ product_type: productType }}</Span>.
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
      <StyledFormField style={{ marginTop: theme.space.base * 7 + "px" }}>
        <StyledCard>
          <Grid>
            <Row>
              <Col xs={1}>
                <WhoIcon />
              </Col>
              <Col>
                <StyledLabel>{t("__EXPRESS_WIZARD_STEP_WHO_LABEL")}</StyledLabel>
                <StyledParagraph>
                  <Trans i18nKey="__EXPRESS_WIZARD_STEP_RECAP_WHO_CONTENT_TEXT">
                    Testers speak <Span isBold>{{ campaign_language: lang }}</Span>.
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
                <WhenIcon />
              </Col>
              <Col>
                <StyledLabel>{t("__EXPRESS_WIZARD_STEP_WHEN_LABEL")}</StyledLabel>
                <StyledParagraph>
                  <Trans i18nKey="__EXPRESS_WIZARD_STEP_RECAP_WHEN_CONTENT_TEXT">
                    Campaign starts on <Span isBold>{{ campaign_date: date_start_text }}</Span> and ends on <Span isBold>{{ campaign_date_end: date_end_text }}</Span>.
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
                <MoreIcon />
              </Col>
              <Col>
                <StyledLabel>{t("__EXPRESS_WIZARD_STEP_RECAP_MORE_LABEL")}</StyledLabel>
                <StyledParagraph>
                  <Paragraph>{t("__EXPRESS_WIZARD_STEP_RECAP_MORE_CONTENT_TEXT")}</Paragraph>
                </StyledParagraph>
                <StyledTextarea
                  {...props.getFieldProps('campaign_more_info')}
                  placeholder={t("__EXPRESS_WIZARD_STEP_RECAP_MORE_TEXTAREA_PLACEHOLDER")}
                  minRows={6}
                />
                <TextareaNote><InfoIcon width={"15"} height={"15"} /> {t("__EXPRESS_WIZARD_STEP_RECAP_MORE_TEXTAREA_NOTE")}</TextareaNote>
              </Col>
            </Row>
          </Grid>
        </StyledCard>
      </StyledFormField>
    </>
  );
};

export const ConfirmationValidationSchema = Yup.object().shape({});
