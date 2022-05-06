import * as Yup from "yup";
import { FormikProps } from "formik";
import { WizardModel } from "../wizardModel";
import { useTranslation, Trans } from "react-i18next";

export const ConfirmationStep = (props: FormikProps<WizardModel>) => {
  const { errors, values, setFieldValue, handleChange } = props;

  return (
    <>
      --- TO BE STYLED ---
      {JSON.stringify(values, null, 4)}
    </>
  );
};

export const ConfirmationValidationSchema = Yup.object().shape({});
