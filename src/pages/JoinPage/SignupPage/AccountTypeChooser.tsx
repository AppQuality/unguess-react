import { Button, Card, LG, Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import tryberCardImage from 'src/assets/tryber_button.png';
import unguessCardImage from 'src/assets/unguess_button.png';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';

const TRYBER_GETTING_STARTED_URL = 'https://app.tryber.me/getting-started/';

const ChooserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.md}`};
`;

const TitleBlock = styled.div`
  text-align: center;
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    gap: ${({ theme }) => theme.space.xl};
  }
`;

const ChoiceCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 346px;
  max-width: 100%;
  text-align: center;
  cursor: default;

  &:hover {
    box-shadow: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    width: 390px;
  }
`;

const CardImageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 314 / 126;
`;

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CardTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;
  padding: ${({ theme }) => `${theme.space.lg} 0 ${theme.space.xxs}`};
  flex: 1;
`;

const CardDescription = styled.div`
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.md};
`;

const CardButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: ${({ theme }) => theme.space.lg};
`;

export const AccountTypeChooser = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });

  const proceedToUnguessSignup = () => {
    sendGTMevent({
      event: 'sign-up-flow',
      category: 'not invited',
      action: 'account-type-business',
    });
    const params = new URLSearchParams(searchParams);
    params.set('type', 'business');
    setSearchParams(params);
  };

  const handOffToTryber = () => {
    sendGTMevent({
      event: 'sign-up-flow',
      category: 'not invited',
      action: 'account-type-tester',
    });
    window.location.assign(TRYBER_GETTING_STARTED_URL);
  };

  return (
    <ChooserWrapper data-qa="account-type-chooser">
      <TitleBlock>
        <XL isBold style={{ color: appTheme.palette.blue[600] }}>
          {t('SIGNUP_CHOOSER_TITLE')}
        </XL>
        <XL style={{ color: appTheme.palette.blue[600] }}>
          {t('SIGNUP_CHOOSER_SUBTITLE')}
        </XL>
      </TitleBlock>
      <CardsRow>
        <ChoiceCard>
          <CardImageArea>
            <CardImage
              src={unguessCardImage}
              alt={t('SIGNUP_CHOOSER_BUSINESS_CARD_TITLE')}
            />
          </CardImageArea>
          <CardTextBlock>
            <LG isBold style={{ color: appTheme.palette.blue[600] }}>
              {t('SIGNUP_CHOOSER_BUSINESS_CARD_TITLE')}
            </LG>
            <CardDescription>
              <Trans
                i18nKey="SIGNUP_CHOOSER_BUSINESS_CARD_DESCRIPTION"
                components={{ bold: <Span isBold /> }}
              />
            </CardDescription>
          </CardTextBlock>
          <CardButtonRow>
            <Button
              isPrimary
              isAccent
              isPill
              style={{ width: 184 }}
              data-qa="go-to-unguess"
              onClick={proceedToUnguessSignup}
            >
              {t('SIGNUP_CHOOSER_BUSINESS_CARD_CTA')}
            </Button>
          </CardButtonRow>
        </ChoiceCard>
        <ChoiceCard>
          <CardImageArea>
            <CardImage
              src={tryberCardImage}
              alt={t('SIGNUP_CHOOSER_TESTER_CARD_TITLE')}
            />
          </CardImageArea>
          <CardTextBlock>
            <LG isBold style={{ color: appTheme.palette.blue[600] }}>
              {t('SIGNUP_CHOOSER_TESTER_CARD_TITLE')}
            </LG>
            <CardDescription>
              <Trans
                i18nKey="SIGNUP_CHOOSER_TESTER_CARD_DESCRIPTION"
                components={{ bold: <Span isBold /> }}
              />
            </CardDescription>
          </CardTextBlock>
          <CardButtonRow>
            <Button
              isPill
              style={{ width: 184 }}
              data-qa="go-to-tryber"
              onClick={handOffToTryber}
            >
              {t('SIGNUP_CHOOSER_TESTER_CARD_CTA')}
            </Button>
          </CardButtonRow>
        </ChoiceCard>
      </CardsRow>
    </ChooserWrapper>
  );
};
