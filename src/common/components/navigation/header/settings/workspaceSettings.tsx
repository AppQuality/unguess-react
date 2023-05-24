import { theme as globalTheme } from 'src/app/theme';
import {
  Label,
  Modal,
  ModalClose,
  Span,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import {
  useDeleteWorkspacesByWidUsersMutation,
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import { FixedBody, FlexContainer, SettingsDivider } from './styled';

export const WorkspaceSettings = ({ onClose }: { onClose: () => void }) => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { t } = useTranslation();
  const [addNewMember] = usePostWorkspacesByWidUsersMutation();
  const [removeUser] = useDeleteWorkspacesByWidUsersMutation();

  const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  if (!activeWorkspace) return null;

  const onSubmitNewMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    addNewMember({
      wid: activeWorkspace?.id.toString(),
      body: {
        email: values.email,
      },
    })
      .then(() => {
        actions.setSubmitting(false);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        actions.setSubmitting(false);
      });
  };

  const onResendInvite = (email: string) => {
    addNewMember({
      wid: activeWorkspace.id.toString(),
      body: {
        email,
      },
    }).unwrap();
  };

  const onRemoveUser = (id: number) => {
    removeUser({
      wid: activeWorkspace.id.toString(),
      body: {
        user_id: id,
      },
    }).unwrap();
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
        <Span style={{ color: globalTheme.palette.blue[600] }}>
          {`${activeWorkspace.company}'s workspace`}
        </Span>
      </Modal.Header>
      <FixedBody>
        <AddNewMemberInput onSubmit={onSubmitNewMember} />
      </FixedBody>
      <SettingsDivider />
      <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Label>{t('__PERMISSION_SETTINGS_BODY_TITLE')}</Label>
        <FlexContainer loading={isLoading || isFetching}>
          {data?.items.map((user) => (
            <UserItem
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
