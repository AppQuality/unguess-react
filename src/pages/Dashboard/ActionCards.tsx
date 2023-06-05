import {
  Col,
  Row,
  Paragraph,
  theme,
  ProductCard,
  TextDescription,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import {
  lockProject,
  openDrawer,
  openWizard,
  setExpressProject,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { hasEnoughCoins, isMinMedia, toggleChat } from 'src/common/utils';
import { useEffect } from 'react';
import i18n from 'src/i18n';
import { useGeti18nExpressTypesQuery } from 'src/features/backoffice/strapi';
import { extractStrapiData } from 'src/common/getStrapiData';
import { ExpressWizardContainer } from '../ExpressWizard';
import { ExpressDrawer } from '../ExpressWizard/drawer';
import { CardRowLoading } from './CardRowLoading';

export const ActionCards = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { projectId } = useAppSelector((state) => state.filters);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  // TODO: this is a hack to get the express type id without a service attached
  const {
    data: exploratoryExpress,
    isLoading,
    isError,
    isFetching,
  } = useGeti18nExpressTypesQuery({
    locale: i18n.language,
    filters: {
      express: {
        slug: {
          $eq: 'exploratory-test',
        },
      },
    },
  });

  const { data } = useGetProjectsByPidQuery({
    pid: projectId ?? 0,
  });

  let selectedProject = { id: projectId, name: 'Project' };
  let expressTypeId = 0;

  useEffect(() => {
    if (data) {
      selectedProject = { id: data.id, name: data.name };
    }
  }, [data]);

  useEffect(() => {
    const expressData = extractStrapiData(exploratoryExpress);
    if (expressData && expressData.length) {
      expressTypeId = expressData[0].id;
    }
  }, [exploratoryExpress]);

  if (
    !projectId ||
    isError ||
    !hasEnoughCoins({ workspace: activeWorkspace })
  ) {
    return null;
  }

  return isLoading || isFetching ? (
    <CardRowLoading />
  ) : (
    <Row>
      <Col xs={12} style={{ marginBottom: `${theme.space.base * 4}px` }}>
        <Paragraph>
          <TextDescription>
            {t('__DASHABOARD_NEWS_ACTION_CARDS_TITLE MAX:12').toUpperCase()}
          </TextDescription>
        </Paragraph>
      </Col>
      <Col xs={12} md={4} lg={3}>
        <ProductCard
          id="express-card-project"
          onCtaClick={() => {
            dispatch(setExpressProject(selectedProject));
            dispatch(setExpressTypeId(expressTypeId));
            dispatch(lockProject());
            dispatch(openDrawer());
            toggleChat(false);
          }}
          icon={<ExpressIcon />}
          ctaLabel={t('__DASHABOARD_EXPRESS_CARD_CTA_TEXT')}
          preTitle={t('__DASHABOARD_EXPRESS_CARD_PRE_TITLE MAX:12')}
          productTitle={t('__DASHABOARD_EXPRESS_CARD_TITLE MAX:12')}
        />
      </Col>
      <ExpressDrawer
        onCtaClick={() => {
          dispatch(openWizard());
          if (isMinMedia(theme.breakpoints.sm)) toggleChat(false);
        }}
      />
      <ExpressWizardContainer />
    </Row>
  );
};
