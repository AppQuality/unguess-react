import { Tag, TemplateCard } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { CpReqTemplate, Module } from 'src/features/api';
import styled from 'styled-components';
import { isTemplateTailored, useTemplatesContext } from './Context';
import { useTranslation } from 'react-i18next';

const CardsGrid = styled.div`
  padding: ${appTheme.space.xl} 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${appTheme.space.lg};
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
  const { setIsDrawerOpen, setSelectedTemplate } = useTemplatesContext();
  const { t } = useTranslation();
  return (
    <CardsGrid role="list">
      {templates.map((template) => {
        const targetModule: { output: string } | undefined = JSON.parse(
          template.config
        ).modules.find((module: Module) => module.type === 'target');
        const handleClick = () => {
          setSelectedTemplate(template);
          setIsDrawerOpen(true);
        };
        return (
          <TemplateCard
            role="listitem"
            data-qa="template-card"
            isTailored={isTemplateTailored(template)}
            isFast={!!template.price}
            thumbUrl={template.strapi?.image}
            key={template.id}
            title={template.strapi?.title || template.name}
            superTitle={template.strapi?.pre_title}
            description={
              template.strapi?.description || template.description || ''
            }
            onClick={handleClick}
          >
            <TemplateCard.Footer>
              {'price' in template && typeof template.price === 'string' && (
                <TemplateCard.PriceTag text={template.price} />
              )}
              {targetModule?.output && (
                <TemplateCard.UserTag text={targetModule.output} />
              )}

              {template.strapi?.tags.map((tag) => (
                <Tag>
                  <Tag.Avatar>
                    <img src={tag.icon} alt={tag.text} />
                  </Tag.Avatar>
                  {tag.text}
                </Tag>
              ))}
            </TemplateCard.Footer>
          </TemplateCard>
        );
      })}
    </CardsGrid>
  );
};
