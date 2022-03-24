import { useState } from "react";
import { PageTemplate } from "src/features/templates/PageTemplate";
import { LoginForm, Grid, Row, Col } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import WPAPI from "src/common/wpapi";
import { FormikHelpers } from "formik";
import styled from "styled-components";

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default function LoginPage() {
  const { t } = useTranslation();
  const [error, setError] = useState<string | boolean>(false);
  const [cta, setCta] = useState<string>(t("__LOGIN_FORM_CTA"));

  const loginUser = async (
    values: LoginFormFields,
    actions: FormikHelpers<LoginFormFields>
  ) => {
    setError(false);
    try {
      const nonce = await WPAPI.getNonce();
      const response = await WPAPI.login({
        username: values.email,
        password: values.password,
        security: nonce,
      });

      console.log(response);

      setCta(`${t("__LOGIN_FORM_CTA_REDIRECT_STATE")}`);
      window.location.reload();
    } catch (e: unknown) {
      console.log("Login forms errors:", e);
      const { message } = e as Error;
      const error = JSON.parse(message);

      if (error.type === "invalid") {
        setError(`${t("__LOGIN_FORM_FAILED_INVALID")}`);
      } else {
        window.location.reload();
      }
    }
    actions.setSubmitting(false);
  };

  const defaultArgs: any = {
    onSubmit: loginUser,
    title: t("__LOGIN_FORM_TITLE"),
    buttonText: cta,
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    errors: error,
    touched: {},
    validate: (values: any) => {
      let errors: any = {};
      if (!values.email) {
        errors.email = t("__FORM_FIELD_REQUIRED_MESSAGE");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = t("__LOGIN_FORM_EMAIL_FIELD_INVALID_MESSAGE");
      }

      if (!values.password) {
        errors.password = t("__FORM_FIELD_REQUIRED_MESSAGE");
      } else if (values.password.length < 5) {
        errors.password = t("__LOGIN_FORM_PASSWORD_FIELD_LENGTH_INVALID");
      }

      return errors;
    },
  };

  return (
    <PageTemplate title={t("__PAGE_TITLE_LOGIN_PAGE")} route={"login"}>
      <Grid>
        <Row justifyContentMd="center" alignItems="center">
          <Col xs md={5} lg={4}>
            <CenteredXYContainer>
              <LoginForm {...defaultArgs} style={{width: "100%"}}/>
            </CenteredXYContainer>
          </Col>
        </Row>
      </Grid>
    </PageTemplate>
  );
}
