import {
  Accordion,
  Checkbox,
  MD,
  Span,
  TextDescription,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Field } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { UseCaseFilterType } from 'src/features/bugsPage/useCaseFilter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { disabledStyle, LabelSpaceBetween } from './LabelWithCounter';

export const UseCaseField = ({
  useCases,
  maxItemsToShow = 5,
}: {
  useCases: UseCaseFilterType['useCases'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('useCases');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = useCases;

  if (!counters) return null;

  return (
    <>
      <Accordion
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-usecase"
      >
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: appTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_TITLE')}
              </MD>
              <TextDescription
                isSmall
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.title.full)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t(
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_ALL_LABEL'
                    )}
              </TextDescription>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((item) => (
                    <Field
                      style={{ marginBottom: appTheme.space.xs }}
                      className="bugs-drawer-accordion-usecase-item"
                    >
                      <Checkbox
                        value={item.id}
                        name="filter-usecase"
                        disabled={!counters[item.id]}
                        checked={selected.map((i) => i.id).includes(item.id)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                useCases: [
                                  ...(selected
                                    .map((i) => i.id)
                                    .includes(item.id)
                                    ? selected.filter((i) => i.id !== item.id)
                                    : [...selected, item]),
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
                            ...(!counters[item.id] && disabledStyle),
                          }}
                        >
                          {item.title.full.toLowerCase()}
                          <MD>{counters[item.id] || 0}</MD>
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
                    count={available.length - maxItemsToShow}
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_SHOW_MORE_LABEL"
                    values={{
                      useCases: available.length - maxItemsToShow,
                    }}
                    components={{
                      span: <Span isBold />,
                    }}
                    default="Show <span>{{useCases}}</span> more Use Cases"
                  />
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_SHOW_LESS_LABEL'
                  )
                )}
              </ShowMore>
            ) : null}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
      <Divider />
    </>
  );
};
