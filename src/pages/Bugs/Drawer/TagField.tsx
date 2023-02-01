import {
  Accordion,
  Checkbox,
  MD,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { Field } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { TagFilterType } from 'src/features/bugsPage/tagFilter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { LabelSpaceBetween } from './LabelWithCounter';

export const TagField = ({
  tags,
  maxItemsToShow = 5,
}: {
  tags: TagFilterType['tags'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters, loading } = useFilterData('tags');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = tags;

  if (loading || !counters) return null;

  return (
    <>
      <Accordion level={3}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_TITLE')}
              </MD>
              <SM
                style={{
                  color: globalTheme.palette.grey[600],
                  textTransform: 'capitalize',
                }}
              >
                {selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.display_name)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_ALL_LABEL')}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            <Field style={{ marginBottom: globalTheme.space.xs }}>
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
                          ...(selected.map((i) => i.tag_id).includes(0)
                            ? selected.filter((i) => i.tag_id !== 0)
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
                    color: globalTheme.palette.grey[600],
                    textTransform: 'capitalize',
                  }}
                >
                  {t('__BUGS_TAGS_FILTER_ITEM_NO_TAGS')}
                  <MD>{counters.none || 0}</MD>
                </LabelSpaceBetween>
              </Checkbox>
            </Field>
            {available.length &&
              available
                .slice(0, showMore ? undefined : maxItemsToShow - 1)
                .map((tag) => (
                  <Field style={{ marginBottom: globalTheme.space.xs }}>
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
                          color: globalTheme.palette.grey[600],
                          textTransform: 'capitalize',
                        }}
                      >
                        {tag.display_name.toLowerCase()}
                        <MD>{counters[tag.tag_id] || 0}</MD>
                      </LabelSpaceBetween>
                    </Checkbox>
                  </Field>
                ))}
            {available.length > maxItemsToShow && (
              <ShowMore
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {!showMore ? (
                  <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAG_SHOW_MORE_LABEL">
                    Show{' '}
                    <Span isBold>
                      {{
                        tags: available.length - maxItemsToShow + 1,
                      }}
                    </Span>{' '}
                    more tags
                  </Trans>
                ) : (
                  t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAG_SHOW_LESS_LABEL')
                )}
              </ShowMore>
            )}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
      <Divider />
    </>
  );
};
