import {
  Button,
  Col,
  Grid,
  MD,
  Paragraph,
  Row,
  theme,
  XXL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Illustration } from 'src/assets/errorBoundaryPage.svg';
import { Track } from 'src/common/Track';
import { Logged } from 'src/features/templates/Logged';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const ErrorBoundaryPage = () => {
  const { t } = useTranslation();

  return (
    <Track title={t('__ERROR_PAGE_TITLE')}>
      <Logged route="">
        <Container id="error-container" style={{ height: '100%' }}>
          <Grid>
            <Row>
              <Col>
                <Illustration style={{ maxWidth: '38vw' }} />
              </Col>
              <Col alignSelf="center">
                <Paragraph>
                  <XXL isBold>{t('__ERROR_PAGE_TITLE')}</XXL>
                </Paragraph>
                <Paragraph style={{ marginTop: theme.space.sm }}>
                  <MD>{t('__ERROR_PAGE_SUBTITLE')}</MD>
                </Paragraph>

                <Paragraph style={{ marginTop: theme.space.lg }}>
                  <Button
                    isPrimary
                    isAccent
                    onClick={() => window.location.reload()}
                  >
                    {t('__ERROR_PAGE_BUTTON')}
                  </Button>
                </Paragraph>
              </Col>
            </Row>
          </Grid>
        </Container>
      </Logged>
    </Track>
  );
};

export default ErrorBoundaryPage;
