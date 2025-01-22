import {
  AccordionNew,
  Checkbox,
  FormField as Field,
  MD,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { TagFilterType } from 'src/features/bugsPage/tagFilter';
import { LabelSpaceBetween } from './LabelWithCounter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';

export const TagField = ({
  tags,
  maxItemsToShow = 5,
}: {
  tags: TagFilterType['tags'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('tags');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = tags;

  if (!counters) return null;

  return (
    <>
      <AccordionNew
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-tags"
        isCompact
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_TITLE')}
              subtitle={
                selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.display_name)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_ALL_LABEL')
              }
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            <Field
              style={{ marginBottom: appTheme.space.xs }}
              className="bugs-drawer-accordion-no-tags"
            >
              <Checkbox
                value={0}
                name="filter-tags"
                disabled={!counters.none}
                checked={selected.map((i) => i.tag_id).includes('none')}
                onChange={() => {
                  dispatch(
                    updateFilters({
                      filters: {
                        tags: [
                          ...(selected.map((i) => i.tag_id).includes('none')
                            ? selected.filter((i) => i.tag_id !== 'none')
                            : [
                                ...selected,
                                {
                                  tag_id: 'none',
                                  display_name: t(
                                    '__BUGS_TAGS_FILTER_ITEM_NO_TAGS'
                                  ),
                                },
                              ]),
                        ],
                      },
                    })
                  );
                }}
              >
                <LabelSpaceBetween
                  isRegular
                  style={{
                    color: appTheme.palette.grey[700],
                    textTransform: 'capitalize',
                  }}
                >
                  {t('__BUGS_TAGS_FILTER_ITEM_NO_TAGS')}
                  <MD>{counters.none || 0}</MD>
                </LabelSpaceBetween>
              </Checkbox>
            </Field>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow - 1)
                  .map((tag) => (
                    <Field style={{ marginBottom: appTheme.space.xs }}>
                      <Checkbox
                        value={tag.tag_id}
                        name="filter-tags"
                        disabled={!counters[tag.tag_id]}
                        checked={selected
                          .map((i) => i.tag_id)
                          .includes(tag.tag_id)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                tags: [
                                  ...(selected
                                    .map((i) => i.tag_id)
                                    .includes(tag.tag_id)
                                    ? selected.filter(
                                        (i) => i.tag_id !== tag.tag_id
                                      )
                                    : [...selected, tag]),
                                ],
                              },
                            })
                          );
                        }}
                      >
                        <LabelSpaceBetween
                          isRegular
                          style={{
                            color: appTheme.palette.grey[700],
                            textTransform: 'capitalize',
                          }}
                        >
                          {tag.display_name.toLowerCase()}
                          <MD>{counters[tag.tag_id] || 0}</MD>
                        </LabelSpaceBetween>
                      </Checkbox>
                    </Field>
                  ))
              : null}
            {available.length > maxItemsToShow ? (
              <ShowMore
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {!showMore ? (
                  <Trans
                    count={available.length - maxItemsToShow + 1}
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAG_SHOW_MORE_LABEL"
                    values={{
                      count: available.length - maxItemsToShow + 1,
                    }}
                    components={{
                      span: <Span isBold />,
                    }}
                    default="Show <span>{{ count }} more tags</span>"
                  />
                ) : (
                  t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAG_SHOW_LESS_LABEL')
                )}
              </ShowMore>
            ) : null}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      <Divider />
    </>
  );
};
