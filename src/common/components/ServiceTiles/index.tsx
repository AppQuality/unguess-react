import { useCampaignTemplates } from 'src/hooks/useCampaignTemplates';

const ServiceTiles = () => {
  const { data } = useCampaignTemplates();

  return (
    <div style={{ maxHeight: '200px', overflow: 'auto' }}>
      {data.map((template) => (
        <div>
          <div>
            <pre>{JSON.stringify(template, null, 2)}</pre>
            <img alt="" src={template.icon} />
          </div>
          <div>
            {template.output.map((output) => (
              <div>
                <img alt="" src={output.iconUrl} />
                <span>{output.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { ServiceTiles };
