import { Span, Tag, TemplateCard } from '@appquality/unguess-design-system';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { isTemplateTailored } from 'src/common/isTemplateTailored';
import { CpReqTemplate, Module } from 'src/features/api';
import styled from 'styled-components';
import { useTemplatesContext } from './Context';

const CardsGrid = styled.div<{ $singleColumn?: boolean }>`
  padding: ${appTheme.space.xl} 0;
  display: grid;
  grid-template-columns: 1fr;
  white-space: normal;
  word-break: break-word;
  row-gap: ${appTheme.space.lg};
  column-gap: ${appTheme.space.md};
  @container cardsWrapper (min-width: 450px) {
    grid-template-columns: repeat(
      ${(p) => (p.$singleColumn ? 1 : 2)},
      minmax(0, 1fr)
    );
  }
  @container cardsWrapper (min-width: 900px) {
    grid-template-columns: repeat(
      ${(p) => (p.$singleColumn ? 1 : 3)},
      minmax(0, 1fr)
    );
  }
`;

export const TemplateCardsGrid = ({
  templates,
  singleColumn = false,
  highlight,
}: {
  templates: CpReqTemplate[];
  singleColumn?: boolean;
  highlight?: string;
}) => {
  const { setIsDrawerOpen, setSelectedTemplate } = useTemplatesContext();
  const { t } = useTranslation();

  // Helper to highlight matches
  const highlightText = (text: string, query?: string) => {
    if (!query) return text;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part) =>
      regex.test(part) ? (
        <Span style={{ backgroundColor: appTheme.palette.talk[600] }}>
          {part}
        </Span>
      ) : (
        part
      )
    );
  };

  return (
    <CardsGrid role="list" $singleColumn={singleColumn}>
      <AnimatePresence>
        {templates.map((template) => {
          const targetModule: { output: string } | undefined = JSON.parse(
            template.config
          ).modules.find((module: Module) => module.type === 'target');
          const handleClick = () => {
            setSelectedTemplate(template);
            setIsDrawerOpen(true);
          };
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, transform: 'translateY(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0)' }}
              exit={{ opacity: 0, transform: 'translateY(-8px)' }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%' }}
            >
              <TemplateCard
                i18n={{
                  tailoredHeader: t('__TEMPLATE_CARD_TAILORED_HEADER'),
                  unguessHeader: t('__TEMPLATE_CARD_UNGUESS_HEADER'),
                }}
                role="listitem"
                data-qa="template-card"
                isTailored={isTemplateTailored(template)}
                isFast={!!template.price}
                thumbUrl={template.strapi?.image}
                templateTitle={highlightText(
                  template.strapi?.title || template.name,
                  highlight
                )}
                superTitle={highlightText(
                  template.strapi?.pre_title || '',
                  highlight
                )}
                description={highlightText(
                  template.strapi?.description || template.description || '',
                  highlight
                )}
                onClick={handleClick}
              >
                <TemplateCard.Footer>
                  {'price' in template &&
                    typeof template.price === 'string' && (
                      <TemplateCard.PriceTag text={template.price} />
                    )}
                  {targetModule?.output && Number(targetModule.output) > 0 && (
                    <TemplateCard.UserTag text={targetModule.output} />
                  )}

                  {template.strapi?.tags.map((tag) => (
                    <Tag key={tag.text}>
                      <Tag.Avatar>
                        <img src={tag.icon} alt={tag.text} />
                      </Tag.Avatar>
                      {tag.text}
                    </Tag>
                  ))}
                </TemplateCard.Footer>
              </TemplateCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </CardsGrid>
  );
};
