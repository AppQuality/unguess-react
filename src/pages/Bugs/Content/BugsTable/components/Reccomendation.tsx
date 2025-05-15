import { GlobalAlert } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidSuggestionsQuery } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';

const useBannerData = (banner_type: string) => {
  const { t } = useTranslation();

  switch (banner_type) {
    case 'banner_cyber_security':
      return {
        type: 'primary' as const,
        title: t('__BANNER_CROSS_FUNCTIONAL_TITLE_CYBER'),
        message: t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_CYBER'),
      };
    case 'banner_user_experience':
      return {
        type: 'accent' as const,
        title: t('__BANNER_CROSS_FUNCTIONAL_TITLE_EXPERIENCE'),
        message: t('__BANNER_CROSS_FUNCTIONAL_MESSAGE_EXPERIENCE'),
      };
    default:
      return {
        type: 'accent' as const,
        title: '',
        message: '',
      };
  }
};

export const Reccomendation = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId.toString(),
  });
  const { type, title, message } = useBannerData(
    suggestions?.suggestion?.slug || ''
  );
  const navigate = useNavigate();
  const suggestion = suggestions?.suggestion;
  const sendGTMEvent = useSendGTMevent();
  useEffect(() => {
    if (!suggestion?.slug) {
      return;
    }
    sendGTMEvent({
      event: 'reccomendation',
      category: 'bugs',
      action: 'view',
      content: suggestion.slug,
    });
  }, [suggestion?.slug]);

  if (!suggestion) {
    return null;
  }
  return (
    <GlobalAlert
      type={type}
      title={title}
      message={message}
      cta={{
        label: <>{t('__BANNER_CROSS_CTA')}</>,
        onClick: () => navigate(`/templates/${suggestion.serviceId}`),
      }}
      style={{ marginBottom: appTheme.space.lg }}
    />
  );
};
