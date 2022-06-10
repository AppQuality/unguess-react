import { Modal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HubspotProvider from './HuspotProvider';

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

const StyledModal = styled(Modal)`
  background-color: transparent;
  height: 100%;
  max-width: 100%;
`;

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
    <StyledModal
      isLarge
      onClose={onClose}
      title={t('__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL')}
      style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
    >
      <HubspotProvider>
        <div className="meetings-iframe-container" data-src={url} />
      </HubspotProvider>
    </StyledModal>
  ) : null;
};

export { HubspotModal };
