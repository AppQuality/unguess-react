import styled from 'styled-components';
import { ReactComponent as BackgroundImage } from 'src/assets/icons/lost-in-the-space.svg';
import { Button, MD, XL, Col, Row } from '@appquality/unguess-design-system';
import WPAPI from 'src/common/wpapi';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

const StyledRow = styled(Row)`
  background-color: ${appTheme.palette.grey[100]};
  height: 100vh;
  padding: 48px 120px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: ${appTheme.space.sm};
  margin-top: ${appTheme.space.md};
`;

export const NoActiveWorkSpaceState = () => {
  const { t } = useTranslation();
  return (
    <StyledRow alignItems="center" justifyContent="center">
      <Col>
        <BackgroundImage />
      </Col>

      <Col style={{ paddingRight: appTheme.space.md }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('__PAGE_NOT_ACCESIBLE_TITLE')}
        </XL>
        <MD>{t('__PAGE_NOT_ACCESIBLE_DESCRIPTION')}</MD>
        <ButtonWrapper>
          <Button
            isAccent
            isPrimary
            style={{ flex: 1 }}
            color={appTheme.palette.kale[600]}
            onClick={async () => {
              await WPAPI.logout();
            }}
          >
            {t('__PAGE_NOT_ACCESIBLE_BUTTON_LOGOUT')}
          </Button>
          <Button
            isBasic
            color={appTheme.palette.blue[600]}
            style={{ flex: 1 }}
            onClick={() => {
              window.location.href =
                'mailto:help@unguess.io?subject=Page%20not%20accessible';
            }}
          >
            {t('__PAGE_NOT_ACCESIBLE_BUTTON_GET_HELP')}
          </Button>
        </ButtonWrapper>
      </Col>
    </StyledRow>
  );
};
