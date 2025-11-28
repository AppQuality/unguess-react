/* eslint-disable react/no-array-index-key */
import { useChat } from '@ai-sdk/react';
import {
  Button,
  IconButton,
  Input,
  MD,
  SM,
  SpecialCard,
  Tooltip,
} from '@appquality/unguess-design-system';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { useGetUsersMeQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { styled } from 'styled-components';
import { ReactComponent as SparkleIcon } from './icons/sparkle-stroke.svg';
import { ReactComponent as ReloadIcon } from './icons/reload-fill.svg';
import { getRandomLoadingMessage } from './utils/loadingMessage';
import { parseMessages } from './utils/messages';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const ChatInputForm = styled.form`
  display: flex;
  gap: 8px;
`;

const ChatMessage = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};

  > div {
    display: contents;
  }
  span {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 16px;
    background: ${(props) => (props.isUser ? '#d1e7dd' : '#e2e3e5')};
    color: #222;
    max-width: 80%;
    word-break: break-word;
  }
`;

const LoadingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const SystemMessageButtonList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// TODO: we need to find a way to export Step type from backend
type Step = {
  suspendPayload?: { message?: string };
  output?: { message?: string };
  input?: { reasoning?: string };
  name: string;
};

export const Workflow = ({ threadId }: { threadId: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [lastStep, setLastStep] = useState<Step | undefined>(undefined);
  const { data: userData } = useGetUsersMeQuery();
  const { activeWorkspace } = useActiveWorkspace();

  const context = {
    user: userData,
    workspace: activeWorkspace,
    token: process.env.REACT_APP_DEFAULT_TOKEN || '', // In production, we'll handle this directly in Apis
  };

  const {
    messages: chatMessages,
    sendMessage,
    status,
    regenerate,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: 'http://localhost:4111/provola',
      prepareSendMessagesRequest({ messages }) {
        return {
          body: {
            context,
            runId: threadId,
            messages,
          },
        };
      },
    }),
  });
  // Helper to check if AI is currently processing
  const isProcessing = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const { lastStep: parsedLastStep } = parseMessages(chatMessages) as {
      lastStep: Step | undefined;
    };
    setLastStep(parsedLastStep);
  }, [chatMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    await sendMessage({ text: inputValue.trim() });
    setInputValue('');
  };

  return (
    <ChatContainer>
      <ChatBody>
        {chatMessages.length === 0 && (
          <EmptyState>
            <MD>Inizia la conversazione scrivendo un messaggio</MD>
            <SM>Thread ID: {threadId}</SM>
          </EmptyState>
        )}
        {chatMessages.map((msg, i) => (
          <ChatMessage key={msg.id} isUser={msg.role === 'user'}>
            {msg.parts.map((part, index) => {
              if (part.type === 'text')
                return part.text ? (
                  <div>
                    <span key={`part_${msg.id}_${index}`}>{part.text}</span>
                  </div>
                ) : null;

              if (part.type === 'data-workflow') {
                const { steps } = part.data as { steps: Record<string, Step> };
                const lastStepKey = Object.keys(steps).pop();
                const obj = lastStepKey ? steps[lastStepKey] : null;
                const suspendText =
                  obj?.suspendPayload?.message || obj?.output?.message;

                return suspendText ? (
                  <div>
                    <span key={`part_${msg.id}_${index}`}>{suspendText}</span>
                  </div>
                ) : null;
              }

              return null;
            })}

            {status === 'ready' && i === chatMessages.length - 1 && (
              <SystemMessageButtonList>
                <Tooltip
                  content="Click to regenerate"
                  placement="top-end"
                  type="light"
                  size="medium"
                  onClick={(e: any) => {
                    e.stopPropagation();
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => regenerate({ messageId: msg.id })}
                  >
                    <ReloadIcon />
                  </IconButton>
                </Tooltip>
              </SystemMessageButtonList>
            )}
          </ChatMessage>
        ))}

        {status !== 'ready' && (
          <SpecialCard isRecessed style={{ height: 'auto' }}>
            <LoadingHeader>
              <SparkleIcon />
              <MD isBold>{getRandomLoadingMessage()}</MD>
            </LoadingHeader>

            {lastStep
              ? `${lastStep?.input?.reasoning ?? lastStep.name}...`
              : ''}
          </SpecialCard>
        )}
        <div ref={messagesEndRef} />
      </ChatBody>
      <ChatInputForm onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isProcessing}
          placeholder="Scrivi un messaggio..."
        />
        <Button type="submit" disabled={isProcessing || !inputValue.trim()}>
          Send
        </Button>
      </ChatInputForm>
      {error && (
        <div style={{ color: 'red', marginTop: 8 }}>
          Errore: {error.message}
        </div>
      )}
    </ChatContainer>
  );
};
