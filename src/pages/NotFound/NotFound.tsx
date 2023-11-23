import {
  Col,
  Grid,
  Row,
  XXXL,
  XXL,
  Paragraph,
  Button,
  TextDescription,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import desktopIllustration from 'src/assets/not_found/404_desktop.svg';
import mobileIllustration from 'src/assets/not_found/404_mobile.svg';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { appTheme } from 'src/app/theme';
import PageWrapper from './PageWrapper';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const homeRoute = useLocalizeRoute('');

  return (
    <PageWrapper title={t('__404_PAGE_TITLE MAX:10')}>
      <Grid>
        <Row>
          <Col md={6} textAlignMd="end">
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
              <XXXL>{t('__404_PAGE_TITLE MAX:10')}</XXXL>
            </Paragraph>
            <Paragraph>
              <XXL color={appTheme.palette.blue[600]}>
                {t('__404_PAGE_SUB_TITLE MAX:80')}
              </XXL>
            </Paragraph>
            <Paragraph>
              <TextDescription>{t('__404_PAGE_DESCRIPTION')}</TextDescription>
            </Paragraph>

            <Paragraph style={{ marginTop: appTheme.space.lg }}>
              <Button isAccent isPrimary onClick={() => navigate(homeRoute)}>
                {t('__404_PAGE_BUTTON')}
              </Button>
            </Paragraph>
          </Col>
        </Row>
      </Grid>
    </PageWrapper>
  );
};

export default NotFound;
