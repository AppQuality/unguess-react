import { Modal, Button } from '@appquality/unguess-design-system';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { getColor } from '@zendeskgarden/react-theming';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterWithBorder = styled(Modal.Footer)`
  border-top: 1px solid ${({ theme }) => getColor(theme.colors.neutralHue, 200)};
  padding: ${({ theme }) =>
    `${theme.space.base * 4}px ${theme.space.base * 8}px`};
  justify-content: start;
`;

export const PermissionSettingsFooter = () => {
  const { t } = useTranslation();

  return (
    <FooterWithBorder>
      <Button
        isBasic
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        <Button.StartIcon>
          <LinkIcon />
        </Button.StartIcon>
        {t('__WORKSPACE_SETTINGS_MODAL_CTA_COPY_LINK')}
      </Button>
    </FooterWithBorder>
  );
};
