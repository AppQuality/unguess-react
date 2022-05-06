import { Hint, Col, Label, Message, Paragraph, Radio, Row, Span, XL, XXL } from "@appquality/unguess-design-system";
import { Field } from "@zendeskgarden/react-forms";
import { FormikProps } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { WizardModel } from "../wizardModel";
import { CardDivider } from "../cardDivider";
import { t } from "i18next";
import { useState } from "react";
import initialValues from "../wizardInitialValues";

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;

  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledLanguageTitle = styled(XL)`
  padding-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]}; 
`;

const StyledRadioField = styled(Field)`
    margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledHint = styled(Hint)`
    color: ${({ theme }) => theme.palette.yellow[800]};
`;

export const WhoStep = ({ errors, touched, validateField, validateForm, handleChange, values, ...props }: FormikProps<WizardModel>) => {
    const [radioValue, setRadioValue] = useState(initialValues.campaign_language);

    const handleRadioClick = (value: string) => {
        setRadioValue(value);
        props.setFieldValue('campaign_language', value);
    }

    return (
        <>
            <StepTitle>
                <Span isBold>{t("__EXPRESS_WIZARD_STEP_WHO_LABEL")}</Span> {t("__EXPRESS_WIZARD_STEP_WHO_LABEL_EXTRA")}
            </StepTitle>
            <Paragraph>{t("__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION")}</Paragraph>
            <CardDivider />
            <StyledFormField>
                <StyledLanguageTitle>
                    {t("__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_TITLE")}
                </StyledLanguageTitle>
                <Paragraph>
                    {t("__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_DESCRIPTION")}
                </Paragraph>
            </StyledFormField>
            <StyledFormField>
                <Label>
                    {t("__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_LABEL")}
                </Label>
                <Row>
                    <Col>
                        <StyledRadioField>
                            <Radio
                                {...props.getFieldProps('campaign_language')}
                                {...errors.campaign_language && { validation: "error" }}
                                value="it"
                                checked={radioValue === 'it'}
                                onChange={e => handleRadioClick(e.target.value)}
                            >
                                <Label isRegular={true}>
                                    {t("__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_1")}
                                </Label>
                            </Radio>
                        </StyledRadioField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StyledRadioField>
                            <Radio
                                {...props.getFieldProps('campaign_language')}
                                {...errors.campaign_language && { validation: "error" }}
                                value="en"
                                checked={radioValue === 'en'}
                                onChange={e => handleRadioClick(e.target.value)}
                            >
                                <Label isRegular={true}>
                                    {t("__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_2")}
                                </Label>
                                <StyledHint>
                                    {t("__EXPRESS_WIZARD_STEP_WHO_FIELD_LANGUAGE_OPTION_2_HINT")}
                                </StyledHint>
                            </Radio>
                        </StyledRadioField>
                    </Col>
                </Row>
                {errors.campaign_language && <Message validation="error">{errors.campaign_language}</Message>}
            </StyledFormField>
        </>
    );
};

export const WhoStepValidationSchema = Yup.object().shape({
    campaign_language: Yup.string().required(t("__EXPRESS_WIZARD_STEP_WHO_FIELD_CAMPAIGN_LANGUAGE_REQUIRED")),
});