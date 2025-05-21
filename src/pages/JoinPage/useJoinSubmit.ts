import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { usePostUsersMutation } from 'src/features/api';
import { useParams } from 'react-router-dom';
import { JoinFormValues } from './valuesType';

export function useJoinSubmit(isInvited: boolean) {
  const [postFormValues] = usePostUsersMutation();
  const { token, profile } = useParams();

  const onSubmit = useCallback(
    async (
      values: JoinFormValues,
      { setSubmitting }: FormikHelpers<JoinFormValues>
    ) => {
      setSubmitting(true);
      const basicInfo = {
        email: values.email,
        password: values.password,
        name: values.name,
        surname: values.surname,
        roleId: values.roleId,
      };
      try {
        if (isInvited) {
          if (!token || !profile)
            throw new Error('Token or profile is missing');
          await postFormValues({
            body: {
              type: 'invite',
              ...basicInfo,
              profileId: Number(profile),
              token,
            },
          }).unwrap();
        } else {
          await postFormValues({
            body: {
              type: 'new',
              ...basicInfo,
              email: values.email,
              workspace: values.workspace,
            },
          }).unwrap();
        }
      } catch (err) {
        // handle error if needed
      }
      setSubmitting(false);
    },
    [postFormValues, token, profile, isInvited]
  );

  return { onSubmit };
}
