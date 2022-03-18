import { Navigate } from "react-router-dom";
import { PageTemplate } from "src/features/templates/PageTemplate";
import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";

export default function LoginPage({ redirectTo }: { redirectTo: string }) {
  const { t } = useTranslation();
  const defaultArgs: any = {
    onSubmit: (values: any, actions: any) => {
      setTimeout(() => {
        alert(t("__LOGIN_PAGE_ON_SUBMIT_MESSAGE MAX:160"));
        console.log(t("__LOGIN_PAGE_ON_SUBMIT_CONSOLE_TEST_MESSAGE MAX:160"));
        actions.setSubmitting(false);
      }, 2000);
    },
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    errors: {},
    touched: {},
    validate: (values: any) => {
      let errors: any = {};
      if (!values.email) {
        errors.email = t("__FORM_FIELD_REQUIRED_MESSAGE");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = t("__FORM_EMAIL_FIELD_INVALID_MESSAGE");
      }

      if (!values.password) {
        errors.password = t("__FORM_FIELD_REQUIRED_MESSAGE");
      } else if (values.password.length < 8) {
        errors.password = t("__FORM_PASSWORD_FIELD_LENGTH_INVALID_MESSAGE");
      }

      return errors;
    },
  };

  // return !isLoggedIn ? (
  //   // <div>
  //   <LoginForm {...defaultArgs} />
  // ) : (
  //   // </div>
  //   <Navigate to={redirectTo} />
  // );

  return (
    <PageTemplate
      title={t("Log in to UNGUESS")}
      route={"login"}
    >
      <LoginForm {...defaultArgs} />
    </PageTemplate>
  );
}
