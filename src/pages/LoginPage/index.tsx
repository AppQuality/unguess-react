import { useEffect, useState } from "react";
import { LoginForm, Logo, theme } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import WPAPI from "src/common/wpapi";
import { FormikHelpers } from "formik";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import { GoogleTagManager } from "src/common/GoogleTagManager";

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

export default function LoginPage() {
  const { t } = useTranslation();
  // const [error, setError] = useState<string | boolean>(false);
  const [cta, setCta] = useState<string>(t("__LOGIN_FORM_CTA"));
  const { status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "logged") {
      navigate("/");
    }
  }, [navigate, status]);

  const loginUser = async (
    values: LoginFormFields,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormFields>
  ) => {
    try {
      const nonce = await WPAPI.getNonce();
      await WPAPI.login({
        username: values.email,
        password: values.password,
        security: nonce,
      });

      setCta(`${t("__LOGIN_FORM_CTA_REDIRECT_STATE")}`);
      document.location.href = "/";
    } catch (e: unknown) {
      console.log("Login forms errors:", e);
      const { message } = e as Error;
      const error = JSON.parse(message);

      if (error.type === "invalid") {
        console.log("Invalid credentials");
        setStatus({ message: `${t("__LOGIN_FORM_FAILED_INVALID")}` });
      } else {
        console.log("Unknown error");
        document.location.href = "/";
      }
    }

    setSubmitting(false);
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
    errors: false,
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
    card: {
      isFloating: true,
      style: {
        width: "100%",
        maxWidth: "400px",
      },
    },
    passwordForgotLabel: t("__LOGIN_FORM_PASSWORD_FORGOT_LABEL"),
    passwordForgotLink: "/wp-login.php?action=lostpassword",
    backToLabel: t("__LOGIN_FORM_BACK_TO_LABEL"),
    placeholderEmail: t("__LOGIN_FORM_EMAIL_PLACEHOLDER"),
    placeholderPassword: t("__LOGIN_FORM_PASSWORD_PLACEHOLDER"),
    onBackClick: () => {
      document.location.href = "https://unguess.io";
    },
  };

  return (
    <GoogleTagManager title={t("__PAGE_TITLE_LOGIN")}>
      <CenteredXYContainer>
        <Logo
          type={"vertical"}
          size={200}
          style={{ marginTop: theme.space.xs, marginBottom: theme.space.md }}
        />
        <LoginForm {...defaultArgs} />
      </CenteredXYContainer>
    </GoogleTagManager>
  );
}
