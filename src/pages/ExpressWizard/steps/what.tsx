import { Input, Label, Message } from "@appquality/unguess-design-system";
import { Field } from "@zendeskgarden/react-forms";
import { FormikProps } from "formik";
import * as Yup from "yup";

export const WhatStep = ({ errors, touched, validateField, validateForm, handleChange, values, ...props }: FormikProps<{name: string, url: string, email: string}>) => {
    console.log("WhatStep props", props);
    console.log("WhatStep errors", errors);
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
        <Input type={"text"} placeholder="write text..." {...props.getFieldProps('name')} {...errors.name && {validation: "error"}}/>
        {errors.name && <Message validation="error">{errors.name}</Message>}
      </Field>
    </>
  );
};

const urlRe = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

export const WhatStepValidationSchema = Yup.object().shape({
    url: Yup.string().matches(urlRe,'URL is not valid').required('URL is required'),
    email: Yup.string().email('email sad').required('Required'),
    name: Yup.string().required('Required'),
});
