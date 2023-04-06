import {
  IconButton,
  Modal,
  XL,
  Grid,
  Avatar,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear-fill.svg';
import { ReactComponent as VerticalDots } from 'src/assets/icons/overflow-vertical-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useGetWorkspacesByWidUsersQuery } from 'src/features/api';
import { AddNewMemberInput } from './addNewMember';
import { getInitials } from '../utils';

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

const exampleAPIResponse = {
  items: [
    {
      id: 26045,
      profile_id: 25270,
      name: 'Gianpaolo Sinatra',
      email: 'gianpaolo.sinatra@app-quality.com',
      invitationPending: true,
    },
    {
      id: 26354,
      profile_id: 25584,
      name: 'Matteo Toto',
      email: 'it+T25584@unguess.io',
      invitationPending: true,
    },
    {
      id: 28607,
      profile_id: 27853,
      name: 'Raffaella Cantatore',
      email: 'it+T27853@unguess.io',
      invitationPending: true,
    },
    {
      id: 28608,
      profile_id: 27854,
      name: 'Anna De Angelis',
      email: 'it+T27854@unguess.io',
      invitationPending: true,
    },
    {
      id: 58754,
      profile_id: 58364,
      name: 'Alessandro Giommi',
      email: 'it+T58364@unguess.io',
      invitationPending: true,
    },
  ],
  start: 0,
  limit: 0,
  size: 5,
  total: 5,
};

export const WorkspaceSettings = () => {
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { isLoading, isFetching, data } = useGetWorkspacesByWidUsersQuery({
  //   wid: activeWorkspace?.id.toString() || '0',
  // });
  const isFetching = false;

  if (!activeWorkspace) return null;

  return (
    <>
      <IconButton onClick={() => setIsModalOpen(true)}>
        <GearIcon />
      </IconButton>
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
                  {exampleAPIResponse?.items.map((user) => (
                    <UserListItem>
                      <Avatar avatarType="text">
                        {getInitials(user.name)}
                      </Avatar>
                      <div>{user.name}</div>
                      <IconButton>
                        <VerticalDots />
                      </IconButton>
                    </UserListItem>
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
