import {
  Col,
  Grid,
  Row,
  theme,
  XXXL,
  XXL,
  MD,
  Paragraph,
  Button,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import desktopIllustration from 'src/assets/not_found/404_desktop.svg';
import mobileIllustration from 'src/assets/not_found/404_mobile.svg';
import { NotLoggedPage } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { appTheme } from 'src/app/theme';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const homeRoute = useLocalizeRoute('');

  return (
    <NotLoggedPage title={t('__404_PAGE_TITLE MAX:10')}>
      <Grid>
        <Row>
          <Col md={6}>
            <picture>
              <source
                media={`(min-width: ${appTheme.breakpoints.md})`}
                srcSet={desktopIllustration}
              />
              <img src={mobileIllustration} alt="404 not found" />
            </picture>
          </Col>
          <Col md={6} alignSelf="center">
            <Paragraph>
              <XXXL style={{ color: theme.palette.blue[600] }}>
                {t('__404_PAGE_TITLE MAX:10')}
              </XXXL>
            </Paragraph>
            <Paragraph>
              <XXL style={{ color: theme.palette.blue[600] }}>
                {t('__404_PAGE_SUB_TITLE MAX:80')}
              </XXL>
            </Paragraph>
            <Paragraph>
              <MD style={{ color: theme.palette.grey[600] }}>
                {t('__404_PAGE_DESCRIPTION')}
              </MD>
            </Paragraph>

            <Paragraph style={{ marginTop: theme.space.lg }}>
              <Button isAccent onClick={() => navigate(homeRoute)}>
                {t('__404_PAGE_BUTTON')}
              </Button>
            </Paragraph>
          </Col>
        </Row>
      </Grid>
    </NotLoggedPage>
  );
};

export default NotFound;
