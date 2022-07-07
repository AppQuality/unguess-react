import { DEFAULT_EXPRESS_REQUIRED_COINS } from 'src/constants';
import { Workspace } from 'src/features/api';

export const prepareGravatar = (url: string, size?: number) =>
  `${url}?s=${size || 48}`;

export const toggleChat = (open: boolean) => {
  if (
    typeof HubSpotConversations !== 'undefined' &&
    HubSpotConversations.widget
  ) {
    if (open) {
      HubSpotConversations.widget.refresh();
    } else {
      HubSpotConversations.widget.remove();
    }
  }
};

export const isMinMedia = (breakpoint: string) =>
  window.matchMedia(`only screen and (min-width: ${breakpoint})`).matches;

export const isMaxMedia = (breakpoint: string) =>
  window.matchMedia(`only screen and (max-width: ${breakpoint})`).matches;

export const checkHubspotURL = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'meetings.hubspot.com';
  } catch (e) {
    return false;
  }
};

export const hasEnoughCoins = ({
  workspace,
  coins,
}: {
  workspace?: Workspace;
  coins?: number;
}) => {
  if (!workspace) return false;

  const requiredCoins = coins || DEFAULT_EXPRESS_REQUIRED_COINS;

  return workspace && workspace.coins && workspace.coins >= requiredCoins;
};
