import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetWorkspacesByWidUsersQuery } from 'src/features/api';
import { AddNewMemberInput } from './addNewMember';
import { UserItem } from './userItem';
import { WorkspaceSettingsFooter } from './modalFooter';

const FlexContainer = styled.div<{ loading?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.base * 2}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
  min-height: 0;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

export const WorkspaceSettings = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
    wid: activeWorkspace?.id.toString() || '0',
  });

  if (!activeWorkspace) return null;

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
          <Modal.Header>{t('__WORKSPACE_SETTINGS_MODAL_TITLE')}</Modal.Header>
          <Modal.Body>
            <AddNewMemberInput />
          </Modal.Body>
          <Modal.Body style={{ paddingTop: 0 }}>
            <FlexContainer loading={isLoading || isFetching}>
              {data?.items.map((user) => (
                <UserItem user={user} />
              ))}
            </FlexContainer>
          </Modal.Body>
          <WorkspaceSettingsFooter />
          <ModalClose />
        </Modal>
      )}
    </>
  );
};
