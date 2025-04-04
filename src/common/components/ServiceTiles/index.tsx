import { ServiceTile, SM, Tag } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { appTheme } from 'src/app/theme';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { CpReqTemplate } from 'src/features/api';

import styled from 'styled-components';

const AdditionalInfoTag = styled(Tag)`
  img {
    width: 12px;
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

interface ServiceTilesProps {
  promoTemplates: CpReqTemplate[];
  onClick: (tid: number) => void;
}

const ServiceTiles = ({ onClick, promoTemplates }: ServiceTilesProps) => {
  if (!promoTemplates?.length) return null;

  return (
    <>
      <ScrollingGrid
        id="service-tiles-scrolling-grid"
        role="list"
        title="promo-templates"
      >
        {promoTemplates.map((template) => {
          if (!template.strapi) return null;
          const { title, price, tags, image, background, pre_title } =
            template.strapi;
          const outputs = tags.map((output) => {
            const { text, icon } = output;
            return (
              <AdditionalInfoTag
                key={text}
                color={appTheme.palette.grey[700]}
                hue="#ffff"
                isPill
                size="medium"
              >
                <img src={icon} alt="icon" />
                {text}
              </AdditionalInfoTag>
            );
          });

          const handleClick = () => {
            onClick(template.id);
          };

          return (
            <ScrollingGrid.Item key={template.id} role="listitem" title={title}>
              <ServiceTile
                title={title}
                description={pre_title}
                background={background || appTheme.palette.blue[700]}
                price={price?.price || ''}
                icon={<img alt={title} src={image} />}
                superscript={price?.previous_price}
                isSuperscriptStrikethrough={!!price?.is_strikethrough}
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
