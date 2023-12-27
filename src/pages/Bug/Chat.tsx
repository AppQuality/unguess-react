import {
  Button,
  Chat,
  Comment,
  useChatContext,
} from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import defaultBkg from 'src/assets/bg-chat.svg';

export const ChatBox = () => {
  const { triggerSave } = useChatContext();

  return (
    <Chat>
      <Chat.Header>Titolone</Chat.Header>
      <Chat.Comments chatBkg={`url(${defaultBkg}) repeat center center`}>
        <Comment
          message="Ciao sono Pippo Baudo"
          author={{ name: 'Pippo Baudo', avatar: 'PB' }}
        >
          delete
          <br />
        </Comment>
      </Chat.Comments>
      <Chat.Input author={{ avatar: 'LC', name: 'Luca C.' }} />
      <Chat.Footer>
        <Button isBasic>Cancel</Button>
        <Button onClick={triggerSave}>Save</Button>
      </Chat.Footer>
      {/*  */}
      {/* 
      <Chat.Comments>
        <Comment
          message="Ciao sono Pippo Baudo"
          author={{ name: 'Pippo Baudo', avatar: 'PB' }}
        >
          delete
          <br />
        </Comment>
      </Chat.Comments> */}
    </Chat>
  );
};
