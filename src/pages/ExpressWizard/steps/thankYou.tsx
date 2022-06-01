import {
  ContainerCard,
  Row,
  Col,
  XXL,
  MD,
  theme,
  ModalFullScreen,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  closeDrawer,
  closeWizard,
  resetWizard,
} from 'src/features/express/expressSlice';
import { ReactComponent as SuccessIcon } from 'src/assets/wizard-success.svg';
import { WaterButton } from '../waterButton';
import { WizardHeader } from '../wizardHeader';

export const ThankYouStep = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  return (
    <>
      <ModalFullScreen.Header>
        <WizardHeader
          workspace={activeWorkspace}
          title={t('__EXPRESS_WIZARD_TITLE')}
        />
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
                  <XXL isBold style={{ color: theme.colors.primaryHue }}>
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_TITLE')}
                  </XXL>
                  <MD style={{ color: theme.palette.grey[600] }}>
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE')}
                  </MD>
                </Col>
              </Row>
              <Row style={{ marginTop: theme.space.xl }}>
                <Col size={12} textAlign="center">
                  <WaterButton
                    isPill
                    isPrimary
                    onClick={() => {
                      dispatch(closeDrawer());
                      dispatch(closeWizard());
                      dispatch(resetWizard());

                      // Refetch the data
                      window.location.reload();

                      // dispatch(
                      //   api.endpoints.getPosts.initiate(
                      //     { count: 5 },
                      //     { subscribe: false, forceRefetch: true }
                      //   )
                      // )
                    }}
                  >
                    {t('__EXPRESS_WIZARD_STEP_THANK_YOU_BUTTON')}
                  </WaterButton>
                </Col>
              </Row>
            </ContainerCard>
          </Col>
        </Row>
      </ModalFullScreen.Body>
    </>
  );
};
