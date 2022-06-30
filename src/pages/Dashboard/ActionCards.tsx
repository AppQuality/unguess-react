import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
  ProductCard,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import {
  lockProject,
  openDrawer,
  openWizard,
  setExpressProject,
} from 'src/features/express/expressSlice';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { hasEnoughCoins, isMinMedia, toggleChat } from 'src/common/utils';
import { useEffect } from 'react';
import { ExpressWizardContainer } from '../ExpressWizard';
import { ExpressDrawer } from '../ExpressWizard/drawer';
import { CardRowLoading } from './CardRowLoading';

export const ActionCards = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);
  const { projectId } = useAppSelector((state) => state.filters);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const { data } = useGetProjectsByPidQuery({
    pid: projectId ?? 0,
  });

  let selectedProject = { id: projectId, name: 'Project' };

  useEffect(() => {
    if (data) {
      selectedProject = { id: data.id, name: data.name };
    }
  }, [data]);

  if (!projectId || !hasEnoughCoins({ workspace: activeWorkspace })) {
    return null;
  }

  return status === 'idle' || status === 'loading' ? (
    <CardRowLoading />
  ) : (
    <Row>
      <Col xs={12} style={{ marginBottom: `${theme.space.base * 4}px` }}>
        <Paragraph>
          <MD style={{ color: theme.palette.grey[700] }}>
            {t('__DASHABOARD_NEWS_ACTION_CARDS_TITLE MAX:12').toUpperCase()}
          </MD>
        </Paragraph>
      </Col>
      <Col xs={12} md={4} lg={3}>
        <ProductCard
          onCtaClick={() => {
            dispatch(setExpressProject(selectedProject));
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
