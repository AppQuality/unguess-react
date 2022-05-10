import {
  Col,
  Dropdown,
  Grid,
  Item,
  Label,
  MediaInput,
  Menu,
  Message,
  Paragraph,
  RadioCard,
  Row,
  Select,
  Span,
  XL,
  XXL,
  theme,
} from "@appquality/unguess-design-system";
import { Field as FormField } from "@zendeskgarden/react-forms";
import { Field as DropdownField } from "@zendeskgarden/react-dropdowns";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { WizardModel } from "../wizardModel";
import styled from "styled-components";
import { t } from "i18next";
import { ReactComponent as WebappIcon } from "src/assets/icons/webapp.svg";
import { ReactComponent as WebappIconActive } from "src/assets/icons/webapp-active.svg";
import { ReactComponent as MobileappIcon } from "src/assets/icons/mobileapp.svg";
import { ReactComponent as MobileappIconActive } from "src/assets/icons/mobileapp-active.svg";
import { ReactComponent as DocumentIcon } from "src/assets/icons/document-icon.svg";
import { ReactComponent as FlagIcon } from "src/assets/icons/flag-icon.svg";
import { useState } from "react";
import { CardDivider } from "../cardDivider";

interface Reasons {
  [key: string]: string;
}

export const reasonItems: Reasons = {
  "reason-a": t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_OPTION_1"),
  "reason-b": t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_OPTION_2"),
  "reason-c": t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_OPTION_3"),
};

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.grey[800]};
  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledOrCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledProductTypeTitle = styled(XL)`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const StyledMessage = styled(Message)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const WhatStep = ({
  errors,
  touched,
  validateField,
  validateForm,
  handleChange,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const [radioValue, setRadioValue] = useState(values.product_type);
  const [selectedItem, setSelectedItem] = useState(values.campaign_reason);

  console.log("values", values);

  const handleRadioClick = (value: string) => {
    setRadioValue(value);
    props.setFieldValue("product_type", value);
  };

  return (
    <>
      <StepTitle>
        <Span isBold>{t("__EXPRESS_WIZARD_STEP_WHAT_LABEL")}</Span>{" "}
        {t("__EXPRESS_WIZARD_STEP_WHAT_LABEL_EXTRA")}
      </StepTitle>
      <Paragraph>{t("__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION")}</Paragraph>
      <CardDivider />
      <StyledFormField>
        <Label>
          {t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_LABEL")}
          <Span style={{ color: theme.colors.dangerHue }}>*</Span>
        </Label>
        <MediaInput
          type={"text"}
          start={<DocumentIcon />}
          placeholder={t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_NAME_PLACEHOLDER")}
          {...props.getFieldProps("campaign_name")}
          focusInset
          {...(errors.campaign_name && { validation: "error" })}
        />
        {errors.campaign_name && (
          <StyledMessage validation="error">
            {errors.campaign_name}
          </StyledMessage>
        )}
      </StyledFormField>
      <StyledFormField>
        <Dropdown
          {...props.getFieldProps("campaign_reason")}
          {...(errors.campaign_reason && { validation: "error" })}
          onSelect={(item) => {
            props.setFieldValue("campaign_reason", item);
            setSelectedItem(item);
            console.log("Item: ", item);
          }}
          selectedItem={selectedItem}
        >
          <DropdownField>
            <Label>
              {t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_LABEL")}
            </Label>
            <Select start={<FlagIcon />}>
              {selectedItem && reasonItems[selectedItem]}
            </Select>
            {errors.campaign_reason && (
              <StyledMessage validation="error">
                {errors.campaign_reason}
              </StyledMessage>
            )}
          </DropdownField>
          <Menu>
            {Object.keys(reasonItems).map((key) => (
              <Item key={key} value={key}>
                {reasonItems[key]}
              </Item>
            ))}
          </Menu>
        </Dropdown>
      </StyledFormField>
      <StyledFormField>
        <StyledProductTypeTitle>
          {t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_LABEL")}
        </StyledProductTypeTitle>
        <Grid>
          <Row>
            <Col xs={5} sm={5} md={5} lg={5}>
              <FormField style={{ height: "100%" }}>
                <RadioCard
                  label={t(
                    "__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_WEBAPP_LABEL"
                  )}
                  icon={<WebappIcon />}
                  iconActive={<WebappIconActive />}
                  {...props.getFieldProps("product_type")}
                  {...(errors.product_type && { validation: "error" })}
                  value={"webapp"}
                  checked={radioValue === "webapp"}
                  onChecked={handleRadioClick}
                />
              </FormField>
            </Col>
            <StyledOrCol>
              <Paragraph>
                {t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_OR_LABEL")}
              </Paragraph>
            </StyledOrCol>
            <Col xs={5} sm={5} md={5} lg={5}>
              <FormField style={{ height: "100%" }}>
                <RadioCard
                  label={t(
                    "__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_MOBILEAPP_LABEL"
                  )}
                  icon={<MobileappIcon />}
                  iconActive={<MobileappIconActive />}
                  {...props.getFieldProps("product_type")}
                  {...(errors.product_type && { validation: "error" })}
                  value={"mobileapp"}
                  checked={radioValue === "mobileapp"}
                  onChecked={handleRadioClick}
                />
              </FormField>
            </Col>
          </Row>
          {errors.product_type && (
            <StyledMessage validation="error">
              {errors.product_type}
            </StyledMessage>
          )}
        </Grid>
      </StyledFormField>
    </>
  );
};

export const WhatStepValidationSchema = Yup.object().shape({
  campaign_name: Yup.string().required(
    t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_NAME_REQUIRED")
  ),
  campaign_reason: Yup.string().required(
    t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_CAMPAIGN_REASON_REQUIRED")
  ),
  product_type: Yup.string().required(
    t("__EXPRESS_WIZARD_STEP_WHAT_FIELD_PRODUCT_TYPE_REQUIRED")
  ),
});
