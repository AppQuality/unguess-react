import { Button, MD, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyInsightsImg } from 'src/assets/empty-insights.svg';
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
 * derived from analyzed media and links back to the media-list tab, merging
 * the `tab` query param instead of replacing the whole search string.
 */
export const HubInsightsEmptyState = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mediaListSearchParams = new URLSearchParams(searchParams);
  mediaListSearchParams.set('tab', 'media-list');

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
        onClick={() => navigate({ search: mediaListSearchParams.toString() })}
      >
        {t('__HUB_INSIGHTS_EMPTY_STATE_CTA')}
      </Button>
    </StyledEmptyState>
  );
};
