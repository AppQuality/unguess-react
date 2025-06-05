import { Button, MD, XL } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as BackgroundImage } from 'src/assets/icons/lost-in-the-space.svg';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${appTheme.palette.grey[100]};
  display: flex;
  align-items: center;
`;

const StyledRow = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${appTheme.space.md};

  @media (min-width: ${appTheme.breakpoints.xl}) {
    flex-direction: row;
    max-width: 1200px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: ${appTheme.space.sm};
  margin-top: ${appTheme.space.md};
`;

export const JoinPageError = () => {
  const { t } = useTranslation();
  const sendGTMevent = useSendGTMevent();
  const { profile, token } = useParams();
  const isInvited = profile && token;

  useEffect(() => {
    sendGTMevent({
      event: 'sign-up-flow',
      category: 'not set',
      action: 'not set',
      content: 'error page',
      target: `is invited: ${isInvited}`,
    });
  }, []);

  return (
    <Wrapper data-qa="join-page-error">
      <StyledRow>
        <BackgroundImage />

        <div style={{ maxWidth: '510px' }}>
          <XL isBold style={{ marginBottom: appTheme.space.xs }}>
            {t('JOIN_PAGE_ERROR_TITLE')}
          </XL>
          <MD>{t('JOIN_PAGE_ERROR_DESCRIPTION')}</MD>
          <ButtonWrapper>
            <Button
              isBasic
              color={appTheme.palette.blue[600]}
              style={{ flex: 1 }}
              onClick={() => {
                window.location.href =
                  'mailto:help@unguess.io?subject=Join%20page%20error';
              }}
            >
              {t('JOIN_PAGE_ERROR_BUTTON_CONTACT')}
            </Button>
            <Button
              isAccent
              isPrimary
              style={{ flex: 1 }}
              color={appTheme.palette.kale[600]}
              onClick={() => {
                document.location.href = '/login';
              }}
            >
              {t('JOIN_PAGE_ERROR_BUTTON_LOGIN')}
            </Button>
          </ButtonWrapper>
        </div>
      </StyledRow>
    </Wrapper>
  );
};
