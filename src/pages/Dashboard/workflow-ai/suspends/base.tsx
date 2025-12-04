import { ReactNode } from 'react';
import styled from 'styled-components';
import { ActionFooter } from './parts/actionFooter';

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

export const BaseSuspendPart = ({
  id,
  key,
  isUser,
  includeFooter = false,
  regenerate,
  children,
}: {
  id: string;
  key: string;
  isUser: boolean;
  includeFooter?: boolean;
  regenerate?: () => void;
  children?: ReactNode;
}) => (
  <>
    <ChatMessage key={id} isUser={isUser}>
      <div>
        <span key={key}>{children}</span>
      </div>
    </ChatMessage>
    {includeFooter && regenerate && (
      <ActionFooter handleRegenerate={regenerate} />
    )}
  </>
);
