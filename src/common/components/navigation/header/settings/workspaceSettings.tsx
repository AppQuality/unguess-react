import {
  Button,
  IconButton,
  Modal,
  XL,
  Grid,
  Avatar,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useGetWorkspacesByWidUsersQuery } from 'src/features/api';
import { AddNewMemberInput } from './addNewMember';
import { getInitials } from '../utils';
import { UserItem } from './userItem';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.base * 2}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const CompanyHolder = styled(XL)`
  text-transform: uppercase;
  margin-top: ${({ theme }) => theme.space.base * 2}px;
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
  color: ${({ theme }) => theme.colors.primaryHue};
  align-self: center;
`;

const UserListItem = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};

  button {
    margin-left: auto;
  }
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
        Manage users
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Body style={{ overflow: 'hidden' }}>
            <FlexContainer>
              <CompanyHolder>{`${activeWorkspace?.company}'s Workspace`}</CompanyHolder>
              <Divider style={{ marginBottom: globalTheme.space.sm }} />
              <AddNewMemberInput />

              <FlexContainer>
                <Grid
                  style={{
                    opacity: isFetching ? 0.7 : 1,
                    height: '400px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                >
                  {data?.items.map((user) => (
                    <UserItem user={user} />
                  ))}
                </Grid>
              </FlexContainer>
            </FlexContainer>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
