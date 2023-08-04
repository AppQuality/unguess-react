import {
  Paragraph,
  XXL,
  Skeleton,
  Anchor,
  Button,
} from '@appquality/unguess-design-system';
import { ReactComponent as HelpImg } from 'src/assets/modal-use-case-help.svg';
import { useGeti18nManualsQuery } from 'src/features/backoffice/strapi';
import { extractStrapiData } from 'src/common/getStrapiData';
import i18n from 'src/i18n';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ReactComponent as NewWindowIcon } from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg';
import StyledCard from './StyledCard';

export const RightModalHelp = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading, isError } = useGeti18nManualsQuery({
    locale: i18n.language,
    populate: {
      help_links: { populate: '*' },
    },
    filters: {
      campaignId: {
        $eq: campaignId,
      },
    },
  });

  const goToSupportCenter = () =>
    window.open(
      `https://docs.unguess.io${
        i18n.language !== 'en' ? `/${i18n.language}` : ''
      }`,
      '_blank'
    );

  const manual = extractStrapiData(data);
  let links;
  if (manual && manual.length) {
    links = extractStrapiData(manual[0].help_links);
  }
  const { t } = useTranslation();

  return (
    <StyledCard>
      <HelpImg />
      <XXL isBold style={{ color: appTheme.palette.grey[800], marginTop: 32 }}>
        {t('__PUBLIC_MANUAL_HELP_MODAL_TITLE')}
      </XXL>
      {isLoading && (
        <>
          <Skeleton height="30px" style={{ marginTop: appTheme.space.md }} />
          <Skeleton height="30px" style={{ marginTop: appTheme.space.md }} />
          <Skeleton height="300px" style={{ marginTop: appTheme.space.md }} />
        </>
      )}
      {(isError || !links || links.length === 0) && (
        <>
          <Paragraph
            style={{ color: appTheme.palette.grey[700], marginTop: 8 }}
          >
            {t('__PUBLIC_MANUAL_HELP_MODAL_CONTENT_NO_LINKS')}
          </Paragraph>
          <Button
            isPrimary
            isAccent
            style={{ marginTop: 36 }}
            onClick={goToSupportCenter}
          >
            <Button.StartIcon>
              <NewWindowIcon />
            </Button.StartIcon>
            {t('__PUBLIC_MANUAL_HELP_MODAL_BUTTON_SUPPORT_CENTER')}
          </Button>
        </>
      )}
      {links && links.length > 0 && !isError && !isLoading && (
        <>
          <Paragraph
            style={{ color: appTheme.palette.grey[700], marginTop: 8 }}
          >
            {t('__PUBLIC_MANUAL_HELP_MODAL_CONTENT')}
          </Paragraph>
          {links.map((link: any) => (
            <Paragraph>
              <Anchor
                href={link.url}
                style={{ marginTop: appTheme.space.lg }}
                isExternal
              >
                {link.title}
              </Anchor>
            </Paragraph>
          ))}
        </>
      )}
    </StyledCard>
  );
};
