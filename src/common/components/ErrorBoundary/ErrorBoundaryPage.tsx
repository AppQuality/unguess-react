import {
  Col,
  Grid,
  Row,
  theme,
  XXL,
  MD,
  Paragraph,
  Button,
} from '@appquality/unguess-design-system';
import { ReactComponent as Illustration } from 'src/assets/errorBoundaryPage.svg';
import { useTranslation } from 'react-i18next';
import { Logged } from 'src/features/templates/Logged';
import { Container } from 'src/pages/ExpressWizard/wizardHeader';
import { GoogleTagManager } from 'src/common/GoogleTagManager';

const ErrorBoundaryPage = () => {
  const { t } = useTranslation();

  return (
    <GoogleTagManager title={t('__ERROR_PAGE_TITLE')}>
      <Logged route="">
        <Container id="error-container" style={{ height: '100%' }}>
          <Grid>
            <Row>
              <Col>
                <Illustration style={{ maxWidth: '38vw' }} />
              </Col>
              <Col alignSelf="center">
                <Paragraph>
                  <XXL style={{ color: theme.palette.grey[800] }} isBold>
                    {t('__ERROR_PAGE_TITLE')}
                  </XXL>
                </Paragraph>
                <Paragraph style={{ marginTop: theme.space.sm }}>
                  <MD style={{ color: theme.palette.grey[800] }}>
                    {t('__ERROR_PAGE_SUBTITLE')}
                  </MD>
                </Paragraph>

                <Paragraph style={{ marginTop: theme.space.lg }}>
                  <Button isPrimary onClick={() => window.location.reload()}>
                    {t('__ERROR_PAGE_BUTTON')}
                  </Button>
                </Paragraph>
              </Col>
            </Row>
          </Grid>
        </Container>
      </Logged>
    </GoogleTagManager>
  );
};

export default ErrorBoundaryPage;
