import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { usePostUsersMutation } from 'src/features/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import WPAPI from 'src/common/wpapi';
import { useToast, Notification } from '@appquality/unguess-design-system';
import { JoinFormValues } from './valuesType';

export function useJoinSubmit(isInvited: boolean) {
  const [postFormValues] = usePostUsersMutation();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get('redirectTo');
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
        let res;
        if (isInvited) {
          if (!token || !profile)
            throw new Error('Token or profile is missing');
          res = await postFormValues({
            body: {
              type: 'invite',
              ...basicInfo,
              profileId: Number(profile),
              token,
            },
          }).unwrap();
        } else {
          res = await postFormValues({
            body: {
              type: 'new',
              ...basicInfo,
              email: values.email,
              workspace: values.workspace,
            },
          }).unwrap();
        }
        const nonce = await WPAPI.getNonce();
        const login = await WPAPI.login({
          username: values.email,
          password: values.password,
          security: nonce,
        });
        console.log('usejoinsubmit - res', res);
        console.log('usejoinsubmit - redirectTo', redirectTo);
        console.log('usejoinsubmit - profile', profile);
        console.log('usejoinsubmit - token', token);
        if (login) {
          if (redirectTo) {
            console.log('usejoinsubmit - redirecting to', redirectTo);
            window.location.href = redirectTo;
          } else if (res.projectId) {
            console.log('usejoinsubmit - navigating to project', res.projectId);
            navigate(`/projects/${res.projectId}`);
          } else {
            console.log('usejoinsubmit - navigating to home');
            navigate('/');
          }
        }
      } catch (err) {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={`Error creating user:${err}`}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      }
      setSubmitting(false);
    },
    [postFormValues, token, profile, isInvited]
  );

  return { onSubmit };
}
