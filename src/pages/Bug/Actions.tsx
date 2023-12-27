import {
  Button,
  Chat,
  ChatProvider,
  Comment,
  LG,
  useChatContext,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BugStateDropdown } from 'src/common/components/BugDetail/BugStateDropdown';
import { Divider } from 'src/common/components/divider';
import { styled } from 'styled-components';
import BugPriority from 'src/common/components/BugDetail/Priority';
import BugTags from 'src/common/components/BugDetail/Tags';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { ChatBox } from './Chat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  height: 100%;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const Actions = () => {
  const { t } = useTranslation();
  const { campaignId, bugId } = useParams();
  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId ? campaignId.toString() : '',
    bid: bugId ? bugId.toString() : '',
  });

  if (!bug || isLoading || isFetching || isError) return null;

  const handleChatSave = (editor: any) => {
    console.log('editor', editor);
  };

  return (
    <Container>
      <LG isBold>{t('__BUG_PAGE_ACTIONS_TITLE')}</LG>
      <Divider style={{ margin: `${appTheme.space.md} auto` }} />
      <GridWrapper>
        <BugStateDropdown bug={bug} />
        <BugPriority bug={bug} />
      </GridWrapper>
      <BugTags bug={bug} refetchBugTags={refetch} />
      <Divider
        style={{ margin: `${appTheme.space.lg} auto ${appTheme.space.md}` }}
      />
      <ChatProvider onSave={handleChatSave}>
        <ChatBox />
      </ChatProvider>
    </Container>
  );
};
