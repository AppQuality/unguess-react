import { Button, MD, Menu } from '@appquality/unguess-design-system';
import { ReactComponent as TranslateIcon } from '@zendeskgarden/svg-icons/src/16/translation-exists-stroke.svg';
import { ReactComponent as BoltIcon } from '@zendeskgarden/svg-icons/src/16/lightning-bolt-stroke.svg';
import { ReactComponent as SmileyIcon } from '@zendeskgarden/svg-icons/src/16/smiley-stroke.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/chevron-right-icon.svg';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const StyledButton = styled(Button)`
  display: flex;
  justify-content: flex-start;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
`;

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
  const [activeItem, setActiveItem] = useState<string>('menu');

  // case 1: no feature flag
  // case 2: feature flag enabled

  // case 1:
  // - buttons with arrows and pay next

  // case 2:
  // - buttons open a modal with the feature

  return (
    <Menu hasArrow>
      {!activeItem ||
        (activeItem === 'menu' && (
          <>
            <StyledButton isBasic isPill={false} size="large" isStretched>
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
            </StyledButton>
            <StyledButton isBasic isPill={false} size="large" isStretched>
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
            </StyledButton>
            <StyledButton isBasic isPill={false} size="large" isStretched>
              <Button.StartIcon style={{ marginRight: appTheme.space.md }}>
                <TranslateIcon />
              </Button.StartIcon>
              <ButtonLabels
                title={t('__TOOLS_MENU_ITEM_TRANSLATE_TITLE')}
                subtitle={t('__TOOLS_MENU_ITEM_TRANSLATE_SUBTITLE')}
              />
              <Button.EndIcon style={{ marginLeft: 'auto' }}>
                <ArrowRight />
              </Button.EndIcon>
            </StyledButton>
          </>
        ))}
      {activeItem === 'sentiment' && 'sentiment'}
      {activeItem === 'autotag' && 'autotag'}
      {activeItem === 'translate' && 'translate'}
    </Menu>
  );
};
