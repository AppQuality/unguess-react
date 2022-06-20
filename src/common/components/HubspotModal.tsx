import { ModalFullScreen } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HubspotProvider from './HuspotProvider';

const MeetingsContainer = styled.div`
  max-height: 90%;
  overflow: hidden;
`;

const checkHubSpotUrl = (url: string): string | boolean => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'meetings.hubspot.com') return false;

    const params = new URLSearchParams(urlObj.search);

    if (!params.has('embed')) params.append('embed', 'true');

    return `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
  } catch (e) {
    // Not a valid url
    return false;
  }
};

interface HubspotModalArgs {
  meetingUrl?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const HubspotModal = (props: HubspotModalArgs) => {
  const { t } = useTranslation();
  const { isOpen, onClose, meetingUrl } = props;

  const url = !meetingUrl ? false : checkHubSpotUrl(meetingUrl);

  if (!url) return null;

  return isOpen ? (
    <ModalFullScreen
      onClose={onClose}
      isLarge
      title={t('__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL')}
      restoreFocus={false}
    >
      <ModalFullScreen.Header>
        {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
        <ModalFullScreen.Close aria-label="Close modal" />
      </ModalFullScreen.Header>
      <HubspotProvider removeOnCleanup>
        <MeetingsContainer
          className="meetings-iframe-container"
          data-src={url}
        />
      </HubspotProvider>
    </ModalFullScreen>
  ) : null;
};

export { HubspotModal };
