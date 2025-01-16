import { ServiceTile, Tag } from '@appquality/unguess-design-system';
import { useCampaignTemplates } from 'src/hooks/useCampaignTemplates';
import styled, { useTheme } from 'styled-components';

const AdditionalInfoTag = styled(Tag)`
  img {
    width: 12px;
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

const ServiceTiles = () => {
  const { data } = useCampaignTemplates();
  const theme = useTheme();

  return (
    <div style={{ maxHeight: '200px', overflow: 'auto' }}>
      <div style={{ display: 'flex', flexGrow: '1' }}>
        {data.map((template) => {
          const icon = <img alt={template.title || ''} src={template.icon} />;
          const superscript = template?.Price?.previous_price;
          const outputs = (template.output || []).map((output) => {
            const { text, iconUrl } = output;
            return (
              <AdditionalInfoTag
                key={text}
                color="#49545c"
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
            <ServiceTile
              title={template.title || ''}
              description={template?.description || ''}
              background={template?.background || theme.palette.blue[700]}
              price={template?.Price?.price || '-'}
              icon={icon}
              superscript={superscript?.length ? superscript : undefined}
              additionalInfo={
                <div style={{ display: 'flex', gap: '4px' }}>{outputs}</div>
              }
            />
          );
        })}
      </div>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export { ServiceTiles };
