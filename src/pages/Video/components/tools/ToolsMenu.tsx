import { Button, MD, Menu } from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { ReactComponent as BoltIcon } from '@zendeskgarden/svg-icons/src/16/lightning-bolt-stroke.svg';
import { ReactComponent as SmileyIcon } from '@zendeskgarden/svg-icons/src/16/smiley-stroke.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/chevron-right-icon.svg';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { FEATURE_FLAG_AI } from 'src/constants';
import { useToolsContext } from './context/ToolsContext';
import { MenuButton } from './MenuButton';
import { ToolsSentimentFlag } from './context/ToolsSentimentFlag';
import { ToolsAutotagFlag } from './context/ToolsAutotagFlag';
import { ToolsTranslateFlag } from './context/ToolsTranslateFlag';
import { ToolsTranslate } from './context/ToolsTranslate';

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${({ theme }) => theme.space.lg};
`;

const ButtonLabels = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <Labels>
    <MD style={{ color: appTheme.palette.grey[800] }}>{title}</MD>
    {subtitle && (
      <MD style={{ color: appTheme.palette.grey[600] }}>{subtitle}</MD>
    )}
  </Labels>
);

export const ToolsMenu = () => {
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI);
  const { activeItem, setActiveItem } = useToolsContext();

  return (
    <Menu hasArrow zIndex={appTheme.levels.front}>
      <div style={{ padding: appTheme.space.xs }}>
        {!activeItem ||
          (activeItem === 'menu' && (
            <>
              <MenuButton onClick={() => setActiveItem('sentiment')}>
                <Button.StartIcon style={{ marginRight: appTheme.space.md }}>
                  <SmileyIcon />
                </Button.StartIcon>
                <ButtonLabels
                  title={t('__TOOLS_MENU_ITEM_SENTIMENT_TITLE')}
                  subtitle={t('__TOOLS_MENU_ITEM_SENTIMENT_SUBTITLE')}
                />
                <Button.EndIcon style={{ marginLeft: 'auto' }}>
                  <ArrowRight />
                </Button.EndIcon>
              </MenuButton>
              <MenuButton onClick={() => setActiveItem('autotag')}>
                <Button.StartIcon style={{ marginRight: appTheme.space.md }}>
                  <BoltIcon />
                </Button.StartIcon>
                <ButtonLabels
                  title={t('__TOOLS_MENU_ITEM_AUTOTAG_TITLE')}
                  subtitle={t('__TOOLS_MENU_ITEM_AUTOTAG_SUBTITLE')}
                />
                <Button.EndIcon style={{ marginLeft: 'auto' }}>
                  <ArrowRight />
                </Button.EndIcon>
              </MenuButton>
              <MenuButton onClick={() => setActiveItem('translate')}>
                <Button.StartIcon style={{ marginRight: appTheme.space.md }}>
                  <TranslateIcon />
                </Button.StartIcon>
                <ButtonLabels
                  title={t('__TOOLS_MENU_ITEM_TRANSLATE_TITLE')}
                  {...(!hasAIFeatureFlag && {
                    subtitle: t('__TOOLS_MENU_ITEM_TRANSLATE_SUBTITLE'),
                  })}
                />
                <Button.EndIcon style={{ marginLeft: 'auto' }}>
                  <ArrowRight />
                </Button.EndIcon>
              </MenuButton>
            </>
          ))}
        {activeItem === 'sentiment' && <ToolsSentimentFlag />}
        {activeItem === 'autotag' && <ToolsAutotagFlag />}
        {activeItem === 'translate' && hasAIFeatureFlag ? (
          <ToolsTranslate />
        ) : (
          <ToolsTranslateFlag />
        )}
      </div>
    </Menu>
  );
};
