import { Notification, useToast } from '@appquality/unguess-design-system';
import { FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import WPAPI from 'src/common/wpapi';
import { usePostUsersMutation } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { JoinFormValues } from './valuesType';

export function useJoinSubmit(isInvited: boolean) {
  const [postFormValues] = usePostUsersMutation();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const { token, profile } = useParams();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });

  const templateId = Number(searchParams.get('template'));

  if (!Number.isInteger(templateId)) {
    throw new Error('Template must be an integer');
  }

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
        companySizeId: values.companySizeId,
        templateId,
      };
      sendGTMevent({
        event: 'sign-up-flow',
        category: `is invited: ${isInvited}`,
        action: 'start submit',
        content: `role: ${values.roleId}`,
      });
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

        if (login) {
          if (redirectTo) {
            sendGTMevent({
              event: 'sign-up-flow',
              category: `is invited: ${isInvited}`,
              action: 'submit success',
              content: 'redirect',
            });
            window.location.href = redirectTo;
          } else if (res.projectId) {
            document.location.href = `/projects/${res.projectId}`;
            sendGTMevent({
              event: 'sign-up-flow',
              category: `is invited: ${isInvited}`,
              action: 'submit success',
              content: 'project',
            });
          } else {
            document.location.href = '/';
            sendGTMevent({
              event: 'sign-up-flow',
              category: `is invited: ${isInvited}`,
              action: 'submit success',
              content: 'home',
            });
          }
        } else document.location.href = '/oops';
      } catch (err) {
        const message = `Error creating user: ${
          err instanceof Error && err.message ? err.message : 'Unknown error'
        }`;
        sendGTMevent({
          event: 'sign-up-flow',
          category: `is invited: ${isInvited}`,
          action: 'submit error',
          content: message,
        });
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={message}
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
