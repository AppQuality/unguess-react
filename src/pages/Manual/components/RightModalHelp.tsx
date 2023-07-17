import {
  Paragraph,
  Timeline,
  XL,
  XXL,
  Skeleton,
  Anchor,
} from '@appquality/unguess-design-system';
import { ReactComponent as HelpImg } from 'src/assets/modal-use-case-help.svg';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-icon.svg';
import { ReactComponent as CancelIcon } from 'src/assets/icons/cancel-icon.svg';
import styled from 'styled-components';
import { getLocalizedStrapiData } from 'src/common/utils';
import { useAppSelector } from 'src/app/hooks';
import { useGeti18nManualsQuery } from 'src/features/backoffice/strapi';
import { extractStrapiData } from 'src/common/getStrapiData';
import i18n from 'src/i18n';
import { appTheme } from 'src/app/theme';
import { ScrollingContainer } from './ScrollingContainer';

const HelpContainer = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  overflow-x: hidden;
`;

const GroupTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-top: ${({ theme }) => theme.space.lg};
  text-transform: uppercase;
`;

export const RightModalHelp = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading, isError, isFetching } = useGeti18nManualsQuery({
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

  const manual = extractStrapiData(data);
  let links;
  if (manual && manual.length) {
    links = extractStrapiData(manual[0].help_links);
  }

  return (
    <ScrollingContainer>
      <HelpContainer>
        <HelpImg />
        {links && !isError && !isFetching && !isLoading ? (
          <>
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
        ) : (
          <>
            <Skeleton height="30px" style={{ marginTop: appTheme.space.md }} />
            <Skeleton height="30px" style={{ marginTop: appTheme.space.md }} />
            <Skeleton height="300px" style={{ marginTop: appTheme.space.md }} />
          </>
        )}
      </HelpContainer>
    </ScrollingContainer>
  );
};
