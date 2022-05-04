import { Input, Label, Message } from "@appquality/unguess-design-system";
import { Field } from "@zendeskgarden/react-forms";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { WizardModel } from "../wizardModel";

export const WhatStep = ({ errors, touched, validateField, validateForm, handleChange, values, ...props }: FormikProps<WizardModel>) => {
  console.log("Errors: ", errors);  
  
  return (
    <>
      <Field>
        <Label>Url</Label>
        <Input type={"url"} placeholder="add url..." {...props.getFieldProps('url')} {...errors.url && {validation: "error"}}/>
        {errors.url && <Message validation="error">{errors.url}</Message>}
      </Field>
      <Field>
        <Label>Email</Label>
        <Input type={"email"} placeholder="write email..." {...props.getFieldProps('email')} {...errors.email && {validation: "error"}}/>
        {errors.email && <Message validation="error">{errors.email}</Message>}
      </Field>
      <Field>
        <Label>Name</Label>
        <Input type={"text"} placeholder="write text..." {...props.getFieldProps('firstName')} {...errors.firstName && {validation: "error"}}/>
        {errors.firstName && <Message validation="error">{errors.firstName}</Message>}
      </Field>
    </>
  );
};

const urlRe = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

export const WhatStepValidationSchema = Yup.object().shape({
    url: Yup.string().matches(urlRe,'URL is not valid').required('URL is required'),
    email: Yup.string().email('email sad').required('Required'),
    firstName: Yup.string().required('Required'),
});
