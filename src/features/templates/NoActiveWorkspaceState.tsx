import styled from 'styled-components';
import { ReactComponent as Background } from 'src/assets/icons/lost-in-the-space.svg';
import { Button, MD, theme, XL } from '@appquality/unguess-design-system';
import WPAPI from 'src/common/wpapi';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  background-color: ${theme.palette.grey[100]};
  background-color: ${theme.palette.red[100]};
  margin: 0;
  padding: 0;
  height: 100%;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const VerticalColumn = styled(Column)`
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const NoActiveWorkSpaceState = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Container>
        <Column>
          <Background />
        </Column>

        <VerticalColumn>
          <XL>{t('__PAGE_NOT_ACCESIBLE_TITLE')}</XL>
          <MD>{t('__PAGE_NOT_ACCESIBLE_DESCRIPTION')}</MD>
          <Button
            isAccent
            isPrimary
            color={theme.palette.kale[600]}
            onClick={async () => {
              await WPAPI.logout();
            }}
          >
            {t('__PAGE_NOT_ACCESIBLE_BUTTON_LOGOUT')}
          </Button>
          <Button
            isBasic
            color={theme.palette.blue[600]}
            onClick={() => {
              window.location.href =
                'mailto:help@unguess.io?subject=Page%20not%20accessible';
            }}
          >
            {t('__PAGE_NOT_ACCESIBLE_BUTTON_GET_HELP')}
          </Button>
        </VerticalColumn>
      </Container>
    </PageContainer>
  );
};
