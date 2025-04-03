import { ServiceTile, SM, Tag } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { useGetWorkspacesByWidTemplatesQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import styled, { useTheme } from 'styled-components';

const AdditionalInfoTag = styled(Tag)`
  img {
    width: 12px;
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const ServiceTiles = ({ handleClick }: { handleClick: () => void }) => {
  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
    },
    {
      skip: !activeWorkspace,
    }
  );
  const theme = useTheme();

  const promoTemplates = useMemo(
    () => data?.items.filter((t) => t.strapi),
    [data?.items]
  );

  if (!promoTemplates?.length) return null;

  return (
    <>
      <ScrollingGrid
        id="service-tiles-scrolling-grid"
        role="list"
        title="dashboard-promo-templates"
      >
        {promoTemplates.map((template) => {
          if (!template.strapi) return null;
          // todo: remove this when api schema is updated for price and background
          // @ts-ignore
          const { title, price, tags, image, description, background } =
            template.strapi;
          const icon = <img alt={title} src={image} />;
          const outputs = tags.map((output) => {
            const { text, icon } = output;
            return (
              <AdditionalInfoTag
                key={text}
                color={theme.palette.grey[700]}
                hue="#ffff"
                isPill
                size="medium"
              >
                <img src={icon} alt="icon" />
                {text}
              </AdditionalInfoTag>
            );
          });

          return (
            <ScrollingGrid.Item key={template.id} role="listitem" title={title}>
              <ServiceTile
                title={title}
                description={description}
                background={background || theme.palette.blue[700]}
                price={price?.current_price}
                icon={icon}
                superscript={price?.previous_price}
                isSuperscriptStrikethrough={price?.isStrikethrough}
                additionalInfo={
                  <div style={{ display: 'flex', gap: '4px' }}>{outputs}</div>
                }
                onClick={handleClick}
              />
            </ScrollingGrid.Item>
          );
        })}
      </ScrollingGrid>
      <SM
        color={appTheme.palette.grey[600]}
        style={{ padding: `0 0 ${appTheme.space.md} 0` }}
      >
        {t('__EXPRESS__SERVICE_TILES_DISCLAIMER')}
      </SM>
    </>
  );
};

export { ServiceTiles };
