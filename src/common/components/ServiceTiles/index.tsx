import { ServiceTile, SM, Tag } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import {
  openDrawer,
  openWizard,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { useCampaignTemplates } from 'src/hooks/useCampaignTemplates';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import styled, { useTheme } from 'styled-components';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';

const AdditionalInfoTag = styled(Tag)`
  img {
    width: 12px;
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const ServiceTiles = () => {
  const { data } = useCampaignTemplates();
  const { hasFeatureFlag } = useFeatureFlag();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  if (!hasFeatureFlag('express')) return null;

  return (
    <>
      <ExpressDrawer
        onCtaClick={() => {
          dispatch(openWizard());
        }}
      />
      <ExpressWizardContainer />
      <ScrollingGrid>
        {data.map((template) => {
          const icon = <img alt={template.title || ''} src={template.icon} />;
          const superscript = template?.Price?.previous_price;
          const outputs = (template.output || []).map((output) => {
            const { text, iconUrl } = output;
            return (
              <AdditionalInfoTag
                key={text}
                color={theme.palette.grey[700]}
                hue="#ffff"
                isPill
                size="medium"
              >
                <img src={iconUrl} alt="icon" />
                {text}
              </AdditionalInfoTag>
            );
          });

          return (
            <ScrollingGrid.Item key={template.expressId}>
              <ServiceTile
                title={template.title || ''}
                description={template?.campaign_type || ''}
                background={template?.background || theme.palette.blue[700]}
                price={template?.Price?.price || '-'}
                icon={icon}
                superscript={superscript?.length ? superscript : undefined}
                isSuperscriptStrikethrough={template?.Price?.is_strikethrough}
                additionalInfo={
                  <div style={{ display: 'flex', gap: '4px' }}>{outputs}</div>
                }
                onClick={() => {
                  dispatch(setExpressTypeId(template.expressId));
                  dispatch(openDrawer());
                }}
              />
            </ScrollingGrid.Item>
          );
        })}
      </ScrollingGrid>
      <SM
        color={appTheme.palette.grey[600]}
        style={{ padding: `${appTheme.space.md} 0` }}
      >
        {t('__EXPRESS__SERVICE_TILES_DISCLAIMER')}
      </SM>
    </>
  );
};

export { ServiceTiles };
