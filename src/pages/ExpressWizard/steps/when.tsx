import {
  Alert,
  Col,
  Grid,
  Label,
  Message,
  Paragraph,
  Row,
  Span,
  XXL,
} from "@appquality/unguess-design-system";
import { Datepicker } from "@zendeskgarden/react-datepickers";
import { Field, Input } from "@zendeskgarden/react-forms";
import { FormikProps } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { WizardModel } from "../wizardModel";
import { CardDivider } from "../cardDivider";
import { t } from "i18next";
import { useState } from "react";
import initialValues from "../wizardInitialValues";
import addBusinessDays from "date-fns/addBusinessDays";

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledAlert = styled(Alert)`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const StyledMessage = styled(Message)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const WhenStep = ({
  errors,
  touched,
  validateField,
  validateForm,
  handleChange,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [startDate, setDate] = useState(initialValues.campaign_date);
  const START_DATE_MAX_VALUE = 30;
  const BUSINESS_DAYS_TO_ADD = 2;

  const handleDateChange = (date: Date) => {
    //We have to add 2 business days to determine the end date
    let endDate = addBusinessDays(date, BUSINESS_DAYS_TO_ADD);
    setDate(date);
    if (values.campaign_language === "en") {
      endDate = addBusinessDays(date, BUSINESS_DAYS_TO_ADD + 1);
    }

    props.setFieldValue("campaign_date", date);
    props.setFieldValue("campaign_date_end", endDate);
  };

  return (
    <>
      <StyledFormField>
        <StepTitle>
          <Span isBold>{t("__EXPRESS_WIZARD_STEP_WHEN_LABEL")}</Span>{" "}
          {t("__EXPRESS_WIZARD_STEP_WHEN_LABEL_EXTRA")}
        </StepTitle>
        <Paragraph>{t("__EXPRESS_WIZARD_STEP_WHEN_DESCRIPTION")}</Paragraph>
      </StyledFormField>
      <CardDivider />
      <StyledFormField>
        <StyledAlert type="warning">
          <StyledAlert.Title>
            {t("__EXPRESS_WIZARD_STEP_WHEN_ALERT_TITLE")}
          </StyledAlert.Title>
          {t("__EXPRESS_WIZARD_STEP_WHEN_ALERT_DESCRIPTION")}
        </StyledAlert>
      </StyledFormField>
      <StyledFormField>
        <Grid>
          <Row>
            <Col xs={6}>
              <Field>
                <Label>
                  {t("__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_LABEL")}
                </Label>
                <Datepicker
                  value={startDate}
                  formatDate={(date: Date) => date.toLocaleDateString()}
                  onChange={handleDateChange}
                  minValue={new Date()}
                  maxValue={
                    new Date(
                      new Date().setDate(
                        new Date().getDate() + START_DATE_MAX_VALUE
                      )
                    )
                  }
                >
                  <Input
                    type={"text"}
                    placeholder={t(
                      "__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_PLACEHOLDER"
                    )}
                    {...props.getFieldProps("campaign_date")}
                    {...(errors.campaign_date && { validation: "error" })}
                  />
                </Datepicker>
                {errors.campaign_date && (
                  <StyledMessage validation="error">
                    {errors.campaign_date}
                  </StyledMessage>
                )}
              </Field>
            </Col>
            <Col xs={6}>
              <Label>
                {t(
                  "__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_RESULTS_LABEL"
                )}
              </Label>
              <Input
                type={"text"}
                placeholder={t(
                  "__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_RESULTS_PLACEHOLDER"
                )}
                readOnly
                disabled
                {...props.getFieldProps("campaign_date_end")}
                value={values?.campaign_date_end?.toLocaleDateString()}
              />
            </Col>
          </Row>
        </Grid>
      </StyledFormField>
      <StyledFormField>
        <Paragraph>
          {t("__EXPRESS_WIZARD_STEP_WHEN_FIELD_CAMPAIGN_DATE_DESCRIPTION")}
        </Paragraph>
      </StyledFormField>
    </>
  );
};

export const WhenStepValidationSchema = Yup.object().shape({
  campaign_date: Yup.string().required(
    t("__EXPRESS_WIZARD_STEP_WHO_FIELD_CAMPAIGN_DATE_REQUIRED")
  ),
});
