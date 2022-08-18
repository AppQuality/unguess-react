import { DEFAULT_EXPRESS_REQUIRED_COINS } from 'src/constants';
import { Workspace } from 'src/features/api';
import { extractStrapiData, StrapiResponse } from './getStrapiData';

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
}): boolean => {
  if (!workspace) return false;
  if (!workspace.coins) return false;

  const requiredCoins = coins || DEFAULT_EXPRESS_REQUIRED_COINS;

  return workspace.coins >= requiredCoins;
};

export const getLocalizedStrapiData = ({
  item,
  language,
}: {
  item: StrapiResponse;
  language: string;
}): any => {
  // Extract the data from the item
  const data = extractStrapiData(item);

  // Verify if localizations are available
  if (data && data.localizations) {
    // Extract the localized items
    const localizations = extractStrapiData(data.localizations);

    // Filter localizations by language
    const localizedItem = localizations.find(
      (localization: any) => localization.locale === language
    );

    if (localizedItem) {
      // Return the localized item
      return localizedItem;
    }
  }

  // Return the default language item (EN)
  return data;
};
