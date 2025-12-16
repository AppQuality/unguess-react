import { ServiceTile, SM, Tag } from '@appquality/unguess-design-system';
import { ReactComponent as UserGroupIcon } from '@zendeskgarden/svg-icons/src/12/user-group-stroke.svg';
import { ReactComponent as RerunIcon } from '@zendeskgarden/svg-icons/src/12/arrow-retweet-stroke.svg';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FallbackIcon } from 'src/assets/icons/purchasable.svg';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { CpReqTemplate, Module } from 'src/features/api';

import { Trans, useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  if (!promoTemplates?.length) return null;
  const fallbackBackground = 'linear-gradient(91deg, #AD1846 0%, #E05B4B 100%)';
  return (
    <>
      <ScrollingGrid
        id="service-tiles-scrolling-grid"
        role="list"
        title="promo-templates"
      >
        {promoTemplates.map((template, i) => {
          const targetModule: { output: string } | undefined = JSON.parse(
            template.config
          ).modules.find((module: Module) => module.type === 'target');
          const targetTag =
            targetModule?.output && Number(targetModule.output) > 0 ? (
              <AdditionalInfoTag
                key="target_output"
                color={appTheme.palette.grey[700]}
                hue="#ffff"
                isPill
                size="medium"
              >
                <UserGroupIcon style={{ marginRight: appTheme.space.base }} />
                <Trans
                  i18nKey="__SERVICE_TILES_TARGET_OUTPUT"
                  values={{ output: targetModule.output }}
                />
              </AdditionalInfoTag>
            ) : null;
          if (!template.strapi) {
            const fallbackTitle = template.name;
            const fallbackPrice = template.price || '';
            const fallbackIcon = <FallbackIcon />;

            const rerunActivityTag = (
              <AdditionalInfoTag
                key="rerun_activity"
                color={appTheme.palette.grey[700]}
                hue="#ffff"
                isPill
                size="medium"
              >
                <RerunIcon style={{ marginRight: appTheme.space.base }} />
                {t('__SERVICE_TILES_FALLBACK_RERUN_ACTIVITY')}
              </AdditionalInfoTag>
            );
            return (
              <ScrollingGrid.Item
                key={template.id}
                role="listitem"
                title={fallbackTitle}
                data-qa={`service-tile-${i}`}
              >
                <ServiceTile
                  title={fallbackTitle}
                  description={t('__SERVICE_TILES_FALLBACK_DESCRIPTION')}
                  background={fallbackBackground}
                  price={fallbackPrice}
                  icon={fallbackIcon}
                  additionalInfo={
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[targetTag, rerunActivityTag]}
                    </div>
                  }
                  onClick={() => onClick(template.id)}
                />
              </ScrollingGrid.Item>
            );
          }
          const { title, price, tags, image, background, pre_title } =
            template.strapi;
          const outputs = tags.map((output) => {
            const { text, icon } = output;
            return (
              <AdditionalInfoTag
                key={text.toLowerCase().replace(/\s+/g, '_')}
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
            <ScrollingGrid.Item
              key={template.id}
              role="listitem"
              title={title || template.name}
              data-qa={`service-tile-${i}`}
            >
              <ServiceTile
                title={title || template.name}
                description={pre_title}
                background={background || fallbackBackground}
                price={price?.price || template.price || ''}
                icon={
                  image ? (
                    <img alt={title || template.name} src={image} />
                  ) : (
                    <FallbackIcon />
                  )
                }
                superscript={price?.previous_price}
                isSuperscriptStrikethrough={!!price?.is_strikethrough}
                additionalInfo={
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[targetTag, outputs]}
                  </div>
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
