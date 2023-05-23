import { theme as globalTheme } from 'src/app/theme';
import {
  Button,
  Label,
  Modal,
  ModalClose,
  Span,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
} from 'src/features/api';
import { FormikHelpers } from 'formik';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { PermissionSettingsFooter } from './modalFooter';
import { FixedBody, FlexContainer, SettingsDivider } from './styled';

export const WorkspaceSettings = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewMember] = usePostWorkspacesByWidUsersMutation();

  const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  if (!activeWorkspace) return null;

  const onAddNewMember = (
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

  return (
    <>
      <Button isBasic onClick={() => setIsModalOpen(true)}>
        <Button.StartIcon>
          <GearIcon />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_CTA_TEXT')}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            {t('__PERMISSION_SETTINGS_HEADER_TITLE')}{' '}
            <Span style={{ color: globalTheme.palette.blue[600] }}>
              {`${activeWorkspace.company}'s workspace`}
            </Span>
          </Modal.Header>
          <FixedBody>
            <AddNewMemberInput
              id={activeWorkspace.id.toString()}
              onSubmit={onAddNewMember}
            />
          </FixedBody>
          <SettingsDivider />
          <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Label>{t('__PERMISSION_SETTINGS_BODY_TITLE')}</Label>
            <FlexContainer loading={isLoading || isFetching}>
              {data?.items.map((user) => (
                <UserItem user={user} />
              ))}
            </FlexContainer>
          </Modal.Body>
          <PermissionSettingsFooter />
          <ModalClose />
        </Modal>
      )}
    </>
  );
};
