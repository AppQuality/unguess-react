import { MD, Span, XL } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyInsightsImg } from 'src/assets/empty-insights-hub.svg';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  padding-top: ${({ theme }) => theme.space.md};
`;

const Subtitle = styled(MD)`
  max-width: 420px;
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const MediaListLink = ({
  to,
  children,
}: {
  to: string;
  children?: React.ReactNode;
}) => (
  <Link to={to}>
    <Span isBold>{children}</Span>
  </Link>
);

export const HubInsightsEmptyState = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { entityId } = useParams<{ entityId?: string }>();
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
      <Subtitle>
        <Trans
          i18nKey="__HUB_INSIGHTS_EMPTY_STATE_SUBTITLE"
          components={{
            medialist: (
              <MediaListLink to={`${mediaListRoute}${location.search}`} />
            ),
          }}
        />
      </Subtitle>
    </StyledEmptyState>
  );
};
