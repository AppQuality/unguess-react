/* eslint-disable security/detect-object-injection */
/* eslint-disable react/no-array-index-key */
import { useChat } from '@ai-sdk/react';
import {
  Button,
  Input,
  MD,
  SM,
  SpecialCard,
} from '@appquality/unguess-design-system';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { useGetUsersMeQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { styled } from 'styled-components';
import { ReactComponent as SparkleIcon } from './icons/sparkle-stroke.svg';
import { BaseSuspendPart } from './suspends/base';
import { ProjectSuspendPart } from './suspends/project';
import { Step } from './types';
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
      api: 'http://localhost:4111/workflow',
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
          <>
            {msg.parts.map((part, index) => {
              if (part.type === 'text')
                return part.text ? (
                  <BaseSuspendPart
                    id={msg.id}
                    key={`part_${msg.id}_${index}`}
                    isUser={msg.role === 'user'}
                    includeFooter={
                      status === 'ready' && i === chatMessages.length - 1
                    }
                    regenerate={() => regenerate({ messageId: msg.id })}
                  >
                    {part.text}
                  </BaseSuspendPart>
                ) : null;

              if (part.type === 'data-workflow') {
                const { steps } = part.data as { steps: Record<string, Step> };
                const lastStepKey = Object.keys(steps).pop();
                const obj = lastStepKey ? steps[lastStepKey] : null;
                const suspendText =
                  obj?.suspendPayload?.message || obj?.output?.message;

                if (!suspendText) return null;
                switch (lastStepKey) {
                  case 'create_activity_workflow.fill_plan_workflow.selectProjectStep':
                    return (
                      <ProjectSuspendPart
                        key={`part_${msg.id}_${index}`}
                        handleSubmit={(projectId) =>
                          sendMessage({ text: projectId.toString() })
                        }
                      >
                        {suspendText}
                      </ProjectSuspendPart>
                    );

                  default:
                    return (
                      <BaseSuspendPart
                        id={msg.id}
                        isUser={msg.role === 'user'}
                        includeFooter={
                          status === 'ready' && i === chatMessages.length - 1
                        }
                        regenerate={() => regenerate({ messageId: msg.id })}
                        key={`part_${msg.id}_${index}`}
                      >
                        {suspendText}
                      </BaseSuspendPart>
                    );
                }
              }

              return null;
            })}
          </>
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
