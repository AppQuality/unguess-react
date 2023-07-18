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
    window.open('https://docs.unguess.io', '_blank');

  const manual = extractStrapiData(data);
  let links;
  if (manual && manual.length) {
    links = extractStrapiData(manual[0].help_links);
  }

  return (
    <StyledCard>
      <HelpImg />
      {isLoading && (
        <>
          <Skeleton height="30px" style={{ marginTop: appTheme.space.md }} />
          <Skeleton height="30px" style={{ marginTop: appTheme.space.md }} />
          <Skeleton height="300px" style={{ marginTop: appTheme.space.md }} />
        </>
      )}
      {(isError || !links || links.length === 0) && (
        <>
          <XXL
            isBold
            style={{ color: appTheme.palette.grey[800], marginTop: 32 }}
          >
            Dubbi o Perplessità?
          </XXL>
          <Paragraph
            style={{ color: appTheme.palette.grey[700], marginTop: 8 }}
          >
            Se hai delle domande o dubbi su come svolgere la campagna di test
            puoi consultare il nostro Support Center che contiene guide e
            tutorial utili.
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
            Vai al Support Center
          </Button>
        </>
      )}
      {links && links.length > 0 && !isError && !isLoading && (
        <>
          {' '}
          <XXL
            isBold
            style={{ color: appTheme.palette.grey[800], marginTop: 32 }}
          >
            Articoli
          </XXL>
          <Paragraph
            style={{ color: appTheme.palette.grey[700], marginTop: 8 }}
          >
            Se hai dubbi su come svolgere la campagna di test puoi consultare il
            nostro Support Center che contiene guide e tutorial utili. Tra i
            quali:
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
