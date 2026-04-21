import { GlobalAlert } from '@appquality/unguess-design-system';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetUsersMeQuery } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const LegacyAuthBanner = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetUsersMeQuery();
  const navigate = useNavigate();
  const profileRoute = useLocalizeRoute('profile');

  if (currentUser?.authType !== 'legacy') return null;

  return (
    <div ref={ref}>
      <GlobalAlert
        type="accent"
        title={t('__APP_LEGACY_AUTH_BANNER_TITLE')}
        message={t('__APP_LEGACY_AUTH_BANNER_MESSAGE')}
        cta={{
          label: t('__APP_LEGACY_AUTH_BANNER_CTA'),
          onClick: () => navigate(`${profileRoute}?openPassword=true`),
        }}
      />
    </div>
  );
});
