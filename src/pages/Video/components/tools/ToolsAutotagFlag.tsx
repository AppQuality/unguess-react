import { Button, MD, Separator, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/chevron-left-icon.svg';
import { styled } from 'styled-components';
import { MenuButton } from './MenuButton';
import { useToolsContext } from './context/ToolsContext';

const Body = styled.div`
  padding: ${({ theme }) => theme.space.md};
`;

const ToolsAutotagFlag = () => {
  const { t } = useTranslation();
  const { activeItem, setActiveItem } = useToolsContext();

  if (activeItem !== 'autotag') return null;

  return (
    <>
      <MenuButton onClick={() => setActiveItem('menu')}>
        <Button.StartIcon>
          <ArrowLeft />
        </Button.StartIcon>
        <Span isBold>{t('__TOOLS_AUTOTAG_PREVIOUS_ITEM')}</Span>
      </MenuButton>
      <Separator />
      <Body>
        <MD>{t('__TOOLS_AUTOTAG_CONTENT')}</MD>
      </Body>
    </>
  );
};

export { ToolsAutotagFlag };
