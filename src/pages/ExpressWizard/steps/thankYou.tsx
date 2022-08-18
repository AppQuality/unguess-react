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
import { useAppDispatch } from 'src/app/hooks';
import {
  closeDrawer,
  closeWizard,
  resetWizard,
} from 'src/features/express/expressSlice';
import { ReactComponent as SuccessIcon } from 'src/assets/wizard-success.svg';
import { WaterButton } from 'src/common/components/waterButton';
import { WizardHeader } from 'src/pages/ExpressWizard/wizardHeader';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';

export const ThankYouStep = ({ values }: { values: WizardModel }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeDrawer());
    dispatch(closeWizard());
    dispatch(resetWizard());

    // Refetch the data
    window.location.reload();
  };

  // Hardcoded breadcrumbs for Wizard (only Services page)
  const breadcrumbs = [
    {
      name: t('__BREADCRUMB_ITEM_SERVICES'),
      onClick: handleClose,
    },
  ];

  return (
    <>
      <ModalFullScreen.Header>
        <WizardHeader
          breadcrumbs={breadcrumbs}
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
                    {values.use_cases
                      ? t('__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE_USE_CASES')
                      : t('__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE')}
                  </MD>
                </Col>
              </Row>
              <Row style={{ marginTop: theme.space.xl }}>
                <Col size={12} textAlign="center">
                  <WaterButton isPill isPrimary onClick={handleClose}>
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
