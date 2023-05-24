import { theme as globalTheme } from 'src/app/theme';
import {
  Label,
  Modal,
  ModalClose,
  Span,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { useGetWorkspacesByWidUsersQuery } from 'src/features/api';
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

  // TODO change hook for get project user
  const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
    wid: projectId?.toString() || '0',
  });

  const onSubmitNewMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    console.log('email: ', values.email);
  };

  const onResendInvite = (email: string) => {
    console.log('email: ', email);
  };

  const onRemoveUser = (id: number) => {
    console.log('user id: ', id);
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
        <Span style={{ color: globalTheme.palette.blue[600] }}>
          {permissionSettingsTitle}
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
