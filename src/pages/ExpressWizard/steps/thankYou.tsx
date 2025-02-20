import {
  ContainerCard,
  Row,
  Col,
  XXL,
  MD,
  theme,
  ModalFullScreen,
  Logo,
  Button,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  closeDrawer,
  closeWizard,
  resetWizard,
} from 'src/features/express/expressSlice';
import { ReactComponent as SuccessIcon } from 'src/assets/wizard-success.svg';
import useWindowSize from 'src/hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Container } from '../wizardHeader';

export const ThankYouStep = ({
  setThankyou,
  setStep,
}: {
  setThankyou: (value: boolean) => void;
  setStep: (value: number) => void;
}) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { project } = useAppSelector((state) => state.express);
  const projRoute = useLocalizeRoute(`projects/${project?.id}`);
  const handleClose = () => {
    dispatch(closeDrawer());
    dispatch(closeWizard());
    dispatch(resetWizard());
    setStep(0);
    setThankyou(false);
    navigate(projRoute);
    // Refetch the data
  };

  return (
    <>
      <ModalFullScreen.Header
        style={{ backgroundColor: appTheme.palette.white }}
      >
        {width > parseInt(theme.breakpoints.sm, 10) ? (
          <Container>
            <Logo
              type="icon"
              size={25}
              style={{ marginRight: theme.space.xs }}
            />
          </Container>
        ) : null}
        <ModalFullScreen.Close aria-label="Close modal" />
      </ModalFullScreen.Header>
      <ModalFullScreen.Body>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} offsetXl={3}>
            <ContainerCard>
              <Row style={{ marginBottom: theme.space.xs }}>
                <Col size={12} textAlign="center">
                  <SuccessIcon />
                </Col>
              </Row>
              <Row style={{ marginTop: theme.space.md }}>
                <Col size={12} textAlign="center">
                  <XXL
                    isBold
                    style={{
                      color: appTheme.components.text.primaryColor,
                      marginBottom: theme.space.xs,
                    }}
                  >
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_TITLE')}
                  </XXL>
                  <MD style={{ color: theme.palette.grey[600] }}>
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE')}
                  </MD>
                </Col>
              </Row>
              <Row style={{ marginTop: theme.space.xl }}>
                <Col size={12} textAlign="center">
                  <Button isPrimary onClick={handleClose}>
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_BUTTON')}
                  </Button>
                </Col>
              </Row>
            </ContainerCard>
          </Col>
        </Row>
      </ModalFullScreen.Body>
    </>
  );
};
