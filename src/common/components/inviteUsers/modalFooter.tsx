import { Button, Modal } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { useCopyLink } from 'src/hooks/useCopyLink';
import styled from 'styled-components';

const FooterWithBorder = styled(Modal.Footer)`
  padding: ${({ theme }) =>
    `${theme.space.base * 4}px ${theme.space.base * 8}px ${
      theme.space.base * 6
    }px`};
  justify-content: end;
`;

export const PermissionSettingsFooter = () => {
  const { t } = useTranslation();

  const copyLinkToClipboard = useCopyLink();

  return (
    <FooterWithBorder>
      <Button
        isBasic
        onClick={() => {
          copyLinkToClipboard();
        }}
      >
        <Button.StartIcon>
          <LinkIcon />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_MODAL_CTA_COPY_LINK')}
      </Button>
    </FooterWithBorder>
  );
};
