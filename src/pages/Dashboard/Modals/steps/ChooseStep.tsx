import {
  Button,
  MD,
  SpecialCard,
  Tag,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as BlueRocketIcon } from 'src/assets/icons/blue-rocket-btn.svg';
import { ReactComponent as OrangeCloudIcon } from 'src/assets/icons/orange-cloud-btn.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const ModalTitle = styled(XL)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const CardsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.space.md};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ActivityCard = styled(SpecialCard)`
  flex: 1;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardFooter = styled(SpecialCard.Footer)`
  margin-top: auto;
`;

const CardMeta = styled(SpecialCard.Meta)`
  min-height: 28px;
`;

const CardThumb = styled(SpecialCard.Thumb)`
  display: flex;
  justify-content: flex-start;
`;

const CardHeader = styled(SpecialCard.Header)`
  text-align: left;
`;

const CardLabel = styled(SpecialCard.Header.Label)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const CardTitle = styled(SpecialCard.Header.Title)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const CardText = styled(SpecialCard.Header.Text)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const CardBody = styled(SpecialCard.Body)`
  text-align: left;
`;

const CardDescription = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const CardIconWrapper = styled.div`
  display: inline-flex;

  svg {
    width: 56px;
    height: 56px;
  }
`;

export const ChooseStep = ({
  onImportMedia,
  onLaunchTest,
}: {
  onImportMedia: () => void;
  onLaunchTest: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ModalTitle isBold>{t('__NEW_ACTIVITY_MODAL_CHOOSE_TITLE')}</ModalTitle>
      <CardsWrapper>
        <ActivityCard onClick={onLaunchTest}>
          <CardMeta justifyContent="end" />
          <CardThumb>
            <CardIconWrapper>
              <BlueRocketIcon />
            </CardIconWrapper>
          </CardThumb>
          <CardHeader>
            <CardTitle>
              {t('__NEW_ACTIVITY_MODAL_START_ACTIVITY_TITLE')}
            </CardTitle>
            <CardText>
              {t('__NEW_ACTIVITY_MODAL_START_ACTIVITY_HEADER_TEXT')}
            </CardText>
          </CardHeader>
          <CardBody>
            <CardDescription>
              {t('__NEW_ACTIVITY_MODAL_START_ACTIVITY_DESCRIPTION')}
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                onLaunchTest();
              }}
            >
              {t('__NEW_ACTIVITY_MODAL_START_ACTIVITY_BUTTON')}
            </Button>
          </CardFooter>
        </ActivityCard>
        <ActivityCard onClick={onImportMedia}>
          <CardMeta justifyContent="end">
            <Tag
              color={appTheme.palette.white}
              hue={appTheme.palette.crimson[500]}
              isPill
              size="medium"
              title={t('__NEW_ACTIVITY_MODAL_UPLOAD_HUB_NEW_TAG')}
            >
              {t('__NEW_ACTIVITY_MODAL_UPLOAD_HUB_NEW_TAG')}
            </Tag>
          </CardMeta>
          <CardThumb>
            <CardIconWrapper>
              <OrangeCloudIcon />
            </CardIconWrapper>
          </CardThumb>
          <CardHeader>
            <CardTitle>{t('__NEW_ACTIVITY_MODAL_UPLOAD_HUB_TITLE')}</CardTitle>
            <CardText>
              {t('__NEW_ACTIVITY_MODAL_UPLOAD_HUB_HEADER_TEXT')}
            </CardText>
          </CardHeader>
          <CardBody>
            <CardDescription>
              {t('__NEW_ACTIVITY_MODAL_UPLOAD_HUB_DESCRIPTION')}
            </CardDescription>
          </CardBody>
          <CardFooter>
            <Button
              isAccent
              isPrimary
              onClick={(event) => {
                event.stopPropagation();
                onImportMedia();
              }}
            >
              {t('__NEW_ACTIVITY_MODAL_CREATE_HUB_BUTTON')}
            </Button>
          </CardFooter>
        </ActivityCard>
      </CardsWrapper>
    </Wrapper>
  );
};
