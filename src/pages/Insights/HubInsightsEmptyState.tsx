import { Button, MD, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyInsightsImg } from 'src/assets/empty-insights.svg';
import { useEntityId } from 'src/hooks/useEntityId';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: ${appTheme.space.md};
`;

/**
 * Empty state for the hub insights tab when there are no observations yet
 * ("soft navigation hint", per the team's plan): explains that insights are
 * derived from analyzed media and links back to the canonical media-list path
 * (`/hubs/:id/videos`), preserving the current query params.
 */
export const HubInsightsEmptyState = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const entityId = useEntityId();
  const mediaListRoute = useLocalizeRoute(
    `hubs/${entityId ?? '0'}/videos`
  ).replace(/\/$/, '');

  return (
    <StyledEmptyState>
      <EmptyInsightsImg
        title={t('__HUB_INSIGHTS_EMPTY_STATE_TITLE')}
        style={{
          marginBottom: appTheme.space.lg,
          marginTop: appTheme.space.xxl,
        }}
      />
      <XL isBold style={{ marginBottom: appTheme.space.sm }}>
        {t('__HUB_INSIGHTS_EMPTY_STATE_TITLE')}
      </XL>
      <MD>{t('__HUB_INSIGHTS_EMPTY_STATE_SUBTITLE')}</MD>
      <Button
        isPrimary
        isAccent
        style={{ marginTop: appTheme.space.md }}
        onClick={() => navigate(`${mediaListRoute}${location.search}`)}
      >
        {t('__HUB_INSIGHTS_EMPTY_STATE_CTA')}
      </Button>
    </StyledEmptyState>
  );
};
