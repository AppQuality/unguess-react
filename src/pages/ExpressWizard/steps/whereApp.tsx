import * as Yup from "yup";
import { FormikProps } from "formik";
import { WizardModel } from "../wizardModel";

export const WhereAppStep = ({
  errors,
  touched,
  validateField,
  validateForm,
  handleChange,
  values,
  setFieldValue,
  ...props
}: FormikProps<WizardModel>) => {
  return <>Inserire i campi qui (WHERE)</>;
};

export const WhereAppStepValidationSchema = Yup.object().shape({});
