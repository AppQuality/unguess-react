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
import { useAppDispatch } from 'src/app/hooks';
import {
  closeDrawer,
  closeWizard,
  resetWizard,
} from 'src/features/express/expressSlice';
import { ReactComponent as SuccessIcon } from 'src/assets/wizard-success.svg';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import useWindowSize from 'src/hooks/useWindowSize';
import { Container } from '../wizardHeader';

export const ThankYouStep = ({ values }: { values: WizardModel }) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeDrawer());
    dispatch(closeWizard());
    dispatch(resetWizard());

    // Refetch the data
    window.location.reload();
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
                    style={{ color: theme.components.colors.primaryText }}
                  >
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_TITLE')}
                  </XXL>
                  <MD style={{ color: theme.palette.grey[600] }}>
                    {values.use_cases
                      ? t('__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE_USE_CASES')
                      : t('__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE')}
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
