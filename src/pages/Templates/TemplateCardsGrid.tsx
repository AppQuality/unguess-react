import { Tag, TemplateCard } from '@appquality/unguess-design-system';
import { ta } from 'date-fns/locale';
import { appTheme } from 'src/app/theme';
import { CpReqTemplate } from 'src/features/api';
import styled from 'styled-components';

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${appTheme.space.sm};
  column-gap: ${appTheme.space.md};
  @container cardsWrapper (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
  }
  @container cardsWrapper (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const TemplateCardsGrid = ({
  templates,
}: {
  templates: CpReqTemplate[];
}) => {
  return (
    <CardsGrid>
      {templates.map((template) => {
        const targetModule = JSON.parse(template.config).modules.find(
          (module: any) => module.type === 'target'
        );
        return (
          <TemplateCard
            data-qa="template-card"
            isTailored={typeof template.workspace_id === 'number'}
            // todo remove this line when the schema will provide the price
            // @ts-ignore
            isFast={template.price}
            thumbUrl={template.strapi?.image}
            key={template.id}
            title={template.strapi?.title || template.name}
            description={template.strapi?.description || template.description}
          >
            <TemplateCard.Footer>
              {'price' in template && typeof template.price === 'string' && (
                <TemplateCard.PriceTag text={template.price} />
              )}
              {targetModule.output && (
                <TemplateCard.UserTag text={targetModule.output} />
              )}

              {
                // remove this line when the schema will provide the tags
                // @ts-ignore
                template.strapi?.tags.map((tag) => (
                  <Tag>
                    <Tag.Avatar>
                      <img src={tag.icon} alt={tag.text} />
                    </Tag.Avatar>
                    {tag.text}
                  </Tag>
                ))
              }
            </TemplateCard.Footer>
          </TemplateCard>
        );
      })}
    </CardsGrid>
  );
};
