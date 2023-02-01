import {
  Accordion,
  Checkbox,
  Label,
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
import { UseCaseFilterType } from 'src/features/bugsPage/useCaseFilter';
import { ShowMore } from './ShowMore';

export const UseCaseField = ({
  useCases,
  maxItemsToShow = 5,
}: {
  useCases: UseCaseFilterType['useCases'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = useCases;

  return (
    <>
      <Accordion level={3}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_TITLE')}
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
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available
              .slice(0, showMore ? undefined : maxItemsToShow)
              .map((item) => (
                <Field style={{ marginBottom: globalTheme.space.xs }}>
                  <Checkbox
                    value={item.id}
                    name="filter-usecase"
                    checked={selected.map((i) => i.id).includes(item.id)}
                    onChange={() => {
                      dispatch(
                        updateFilters({
                          filters: {
                            useCases: [
                              ...(selected.map((i) => i.id).includes(item.id)
                                ? selected.filter((i) => i.id !== item.id)
                                : [...selected, item]),
                            ],
                          },
                        })
                      );
                    }}
                  >
                    <Label
                      isRegular
                      style={{
                        color: globalTheme.palette.grey[600],
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.title.full.toLowerCase()}
                    </Label>
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
                  <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_SHOW_MORE_LABEL">
                    Show{' '}
                    <Span isBold>
                      {{
                        useCases: available.length - maxItemsToShow,
                      }}
                    </Span>{' '}
                    more Use Cases
                  </Trans>
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_SHOW_LESS_LABEL'
                  )
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
