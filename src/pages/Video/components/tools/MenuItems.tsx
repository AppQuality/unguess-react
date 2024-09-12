import {
  Button,
  Label,
  NextItem,
  Paragraph,
  SM,
} from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { ReactComponent as BoltIcon } from '@zendeskgarden/svg-icons/src/16/lightning-bolt-stroke.svg';
import { ReactComponent as SmileyIcon } from '@zendeskgarden/svg-icons/src/16/smiley-stroke.svg';
import { styled } from 'styled-components';
import { useToolsContext } from './context/toolsContext';

export const StyledContainerMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const MenuItems = () => {
  const { setActiveItem } = useToolsContext();

  return (
    <>
      <NextItem value="sentiment">
        <Button
          isPill={false}
          isBasic
          isStretched
          size="large"
          value="sentiment"
          onClick={() => {
            setActiveItem('sentiment');
            // eslint-disable-next-line no-alert
            alert("Hello, I'm the sentiment");
          }}
        >
          <Button.StartIcon>
            <SmileyIcon />
          </Button.StartIcon>
          <Paragraph>
            <Label isRegular>Sentiment</Label>
            <SM> Aggiorna piano PRO</SM>
          </Paragraph>
        </Button>
      </NextItem>
      <Button
        isPill={false}
        isBasic
        isStretched
        size="large"
        value="autotag"
        onClick={() => {
          setActiveItem('autotag');
          // eslint-disable-next-line no-alert
          alert("Hello, I'm the autotag");
        }}
      >
        <Button.StartIcon>
          <BoltIcon />
        </Button.StartIcon>
        <Paragraph>
          <Label isRegular>Autotag</Label>
          <SM> Aggiorna piano PRO</SM>
        </Paragraph>
      </Button>
      <Button
        isPill={false}
        isBasic
        isStretched
        size="large"
        value="translations"
        onClick={() => {
          setActiveItem('translations');
          // eslint-disable-next-line no-alert
          alert("Hello, I'm the translations");
        }}
      >
        <Button.StartIcon>
          <TranslateIcon />
        </Button.StartIcon>
        <Paragraph>
          <Label isRegular>Traduzione Transcript</Label>
        </Paragraph>
      </Button>
    </>
  );
};
