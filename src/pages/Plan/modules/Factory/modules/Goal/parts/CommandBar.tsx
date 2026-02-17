import styled from 'styled-components';
import {
  Tooltip,
  IconButton,
  EditorRef,
} from '@appquality/unguess-design-system';
import { ReactComponent as BoldIcon } from 'src/assets/icons/bold-fill.svg';
import { ReactComponent as ItalicIcon } from 'src/assets/icons/italic-fill.svg';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
`;

const CommandBar = ({ editorRef }: { editorRef: EditorRef | null }) => {
  if (!editorRef) return null;
  const editor = editorRef.getEditor();

  const handleBoldClick = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  };

  const handleItalicClick = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  return (
    <MenuContainer id="menu-container">
      <Tooltip
        content={`${'Bold text'}`}
        placement="top"
        type="light"
        size="small"
        hasArrow={false}
      >
        <IconButton
          size="small"
          isBasic={!editor?.isActive('bold')}
          isPrimary={editor?.isActive('bold')}
          isPill={false}
          onClick={handleBoldClick}
        >
          <BoldIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        content="Italic text"
        placement="top"
        type="light"
        size="small"
        hasArrow={false}
      >
        <IconButton
          size="small"
          isBasic={!editor?.isActive('italic')}
          isPrimary={editor?.isActive('italic')}
          isPill={false}
          onClick={handleItalicClick}
        >
          <ItalicIcon />
        </IconButton>
      </Tooltip>
    </MenuContainer>
  );
};

export { CommandBar };
