import { Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
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
    <Modal
      onClose={onClose}
      isLarge
      title={t('__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL')}
      restoreFocus={false}
    >
      <Modal.Header>
        {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}{' '}
        <ModalClose aria-label="Close modal" />
      </Modal.Header>
      <HubspotProvider removeOnCleanup>
        <div className="meetings-iframe-container" data-src={url} />
      </HubspotProvider>
    </Modal>
  ) : null;
};

export { HubspotModal };
