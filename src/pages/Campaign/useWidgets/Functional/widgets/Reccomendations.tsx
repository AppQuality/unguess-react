import {
  Button,
  SpecialCard,
  Tag,
  XL,
} from '@appquality/unguess-design-system';
import { ReactComponent as IconMail } from '@zendeskgarden/svg-icons/src/16/email-stroke.svg';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ImgExperience } from 'src/assets/banner_suggestions/experience.svg';
import { ReactComponent as ImgCyber } from 'src/assets/banner_suggestions/testing_automation.svg';
import { useGetCampaignsByCidSuggestionsQuery } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import styled from 'styled-components';

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
`;

const BasicWidgetFooter = styled(BasicWidget.Footer)`
  justify-content: center;
`;

const useBannerData = (banner_type: string) => {
  const { t } = useTranslation();
  switch (banner_type) {
    case 'banner_cyber_security':
      return {
        tag: t('__CAMPAIGN_PAGE_SUGGESTIONS_CYBER_TAG'),
        header: t('__CAMPAIGN_PAGE_SUGGESTIONS_CYBER_HEADER'),
        content: t('__CAMPAIGN_PAGE_SUGGESTIONS_CYBER_CONTENT'),
        Image: ImgCyber,
      };
    case 'banner_user_experience':
      return {
        tag: t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_TAG'),
        header: t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_HEADER'),
        content: t('__CAMPAIGN_PAGE_SUGGESTIONS_EXPERIENCE_CONTENT'),
        Image: ImgExperience,
      };
    default:
      return {
        tag: '',
        header: '',
        content: '',
        Image: null,
      };
  }
};

export const Suggestions = ({ campaignId }: { campaignId: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId,
  });

  const sendGTMEvent = useSendGTMevent();

  useEffect(() => {
    if (!suggestions?.suggestion) {
      return;
    }
    sendGTMEvent({
      event: 'reccomendation',
      category: 'campaign',
      action: 'view',
      content: suggestions.suggestion.slug,
    });
  }, [suggestions]);

  const { header, content, tag, Image } = useBannerData(
    suggestions?.suggestion?.slug || ''
  );

  if (!suggestions?.suggestion) {
    return null;
  }

  return (
    <BasicWidget>
      <SpecialCard.Meta justifyContent="end">
        <StyledTagNew isPill size="medium" title={tag}>
          {tag}
        </StyledTagNew>
      </SpecialCard.Meta>
      {Image && <Image style={{ width: '100%', height: 'auto' }} />}
      <BasicWidget.Description
        header={<div style={{ textAlign: 'center' }}>{header}</div>}
        content={
          <XL isBold style={{ textAlign: 'center' }}>
            {content}
          </XL>
        }
        footer=""
      />
      {suggestions.suggestion?.serviceId ? (
        <BasicWidgetFooter noDivider>
          <Button
            size="small"
            onClick={() =>
              navigate(`/templates/${suggestions.suggestion?.serviceId}`)
            }
          >
            {t('__CAMPAIGN_PAGE_SUGGESTIONS_CTA')}
            <IconMail style={{ marginLeft: appTheme.space.xxs }} />
          </Button>
        </BasicWidgetFooter>
      ) : null}
    </BasicWidget>
  );
};
