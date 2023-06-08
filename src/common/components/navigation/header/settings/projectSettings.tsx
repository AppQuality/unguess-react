import { appTheme } from 'src/app/theme';
import {
  Label,
  Modal,
  ModalClose,
  Span,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import {
  useDeleteProjectsByPidUsersMutation,
  useGetProjectsByPidUsersQuery,
  usePostProjectsByPidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import { FixedBody, FlexContainer, SettingsDivider } from './styled';

export const ProjectSettings = ({ onClose }: { onClose: () => void }) => {
  const { permissionSettingsTitle, projectId } = useAppSelector(
    (state) => state.navigation
  );
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [addNewMember] = usePostProjectsByPidUsersMutation();
  const [removeUser] = useDeleteProjectsByPidUsersMutation();

  const { isLoading, isFetching, data, refetch } =
    useGetProjectsByPidUsersQuery({
      pid: projectId?.toString() || '0',
    });

  const onSubmitNewMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    addNewMember({
      pid: projectId?.toString() || '0',
      body: {
        email: values.email,
      },
    })
      .then(() => {
        actions.setSubmitting(false);
        refetch();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        actions.setSubmitting(false);
      });
  };

  const onResendInvite = (email: string) => {
    addNewMember({
      pid: projectId?.toString() || '0',
      body: {
        email,
      },
    })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PERMISSION_SETTINGS_TOAST_RESEND')}
              closeText={t('__PERMISSION_SETTINGS_TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  const onRemoveUser = (id: number) => {
    removeUser({
      pid: projectId?.toString() || '0',
      body: {
        user_id: id,
      },
    })
      .unwrap()
      .then(() => {
        refetch();
      });
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
        <Span style={{ color: appTheme.palette.blue[600] }}>
          {permissionSettingsTitle}
        </Span>
      </Modal.Header>
      <FixedBody>
        <AddNewMemberInput onSubmit={onSubmitNewMember} />
      </FixedBody>
      <SettingsDivider />
      <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Label>{t('__PERMISSION_SETTINGS_BODY_TITLE')}</Label>
        <FlexContainer isLoading={isLoading || isFetching}>
          {data?.items.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onResendInvite={() => onResendInvite(user.email)}
              onRemoveUser={() => onRemoveUser(user.id)}
            />
          ))}
        </FlexContainer>
      </Modal.Body>
      <PermissionSettingsFooter />
      <ModalClose />
    </Modal>
  );
};
