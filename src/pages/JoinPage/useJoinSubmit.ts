import { useCallback } from 'react';
import { FormikHelpers, useFormikContext } from 'formik';
import { PostUsersApiResponse, usePostUsersMutation } from 'src/features/api';
import { JoinFormValues } from './valuesType';
import { useParams } from 'react-router-dom';

export function useJoinSubmit() {
  const [postFormValues] = usePostUsersMutation();
  const { token, profile } = useParams();
  const { status } = useFormikContext<PostUsersApiResponse>();

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
        if (status.isInvited) {
          if (!token || !profile)
            throw new Error('Token or profile is missing');
          await postFormValues({
            body: {
              type: 'invite',
              ...basicInfo,
              profileId: Number(profile),
              token: token,
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
    [postFormValues, token, profile, status.isInvited]
  );

  return { onSubmit };
}
