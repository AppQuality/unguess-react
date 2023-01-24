import {
  Accordion,
  Anchor,
  Button,
  Checkbox,
  Drawer,
  Label,
  MD,
  Radio,
  Skeleton,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import {
  getCurrentCampaignData,
  resetFilters,
  setFilterDrawerOpen,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';

export const WaterButton = styled(Button)``;

WaterButton.defaultProps = {
  themeColor: globalTheme.palette.water[600],
};

const AccordionLabel = styled(MD)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const ShowMore = styled(Anchor)`
  display: block;
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  color: ${({ theme }) => theme.colors.primaryHue};
  padding-left: ${({ theme }) => theme.space.base * 6}px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TagsContainer = styled.div`
  padding-left: ${({ theme }) => theme.space.base * 6}px;
  margin-top: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const BugsFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isFilterDrawerOpen } = useAppSelector((state) => state.bugsPage);
  const bugsCount = 99;
  const campaignData = getCurrentCampaignData();
  const [showMore, setShowMore] = useState({
    types: false,
    severities: false,
    tags: false,
    useCases: false,
  });
  const maxItemsToShow = 1;

  console.log('campaignData', campaignData);

  if (!campaignData) return <Skeleton />;

  const onClose = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCtaClick = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onResetClick = () => {
    dispatch(resetFilters());
  };

  const { types, severities, unique, tags, useCases } = campaignData;

  // TODO: remove this, API bug - Filter only unique ids useCases
  const availableUseCases = useCases.available.filter(
    (useCase, index, self) =>
      index === self.findIndex((u) => u.id === useCase.id)
  );

  const [radioTags, setRadioTags] = useState('all');

  useEffect(() => {
    if (radioTags === 'all') {
      dispatch(
        updateFilters({
          filters: {
            tags: tags.available,
          },
        })
      );
    }
  }, []);

  return (
    <Drawer isOpen={isFilterDrawerOpen} onClose={onClose} restoreFocus={false}>
      <Drawer.Header>
        {t('__BUGS_PAGE_FILTER_DRAWER_HEADER_TITLE')}
      </Drawer.Header>
      <Drawer.Body>
        <>
          <MD
            isBold
            style={{
              color: globalTheme.palette.grey[600],
              marginBottom: globalTheme.space.sm,
            }}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_BODY_COMMON_LABEL')}
          </MD>

          {unique.available.length && (
            <>
              <Accordion level={3}>
                <Accordion.Section>
                  <Accordion.Header>
                    <Accordion.Label>
                      <AccordionLabel isBold>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DUPLICATES_TITLE'
                        )}
                      </AccordionLabel>
                      <SM
                        style={{
                          color: globalTheme.palette.grey[600],
                          textTransform: 'capitalize',
                        }}
                      >
                        {unique.selected === 'unique'
                          ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
                          : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')}
                      </SM>
                    </Accordion.Label>
                  </Accordion.Header>
                  <Accordion.Panel>
                    {unique.available.map((item) => (
                      <Field>
                        <Radio
                          value={item}
                          name="filter-duplicates"
                          checked={unique.selected && unique.selected === item}
                          onChange={() => {
                            dispatch(
                              updateFilters({
                                filters: {
                                  unique: item,
                                },
                              })
                            );
                          }}
                        >
                          <Label>
                            {unique.selected === 'unique'
                              ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
                              : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')}
                          </Label>
                        </Radio>
                      </Field>
                    ))}
                  </Accordion.Panel>
                </Accordion.Section>
              </Accordion>
              <Divider />
            </>
          )}

          {severities.available.length && (
            <>
              <Accordion level={3}>
                <Accordion.Section>
                  <Accordion.Header>
                    <Accordion.Label>
                      <AccordionLabel isBold>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITY_TITLE'
                        )}
                      </AccordionLabel>
                      <SM
                        style={{
                          color: globalTheme.palette.grey[600],
                          textTransform: 'capitalize',
                        }}
                      >
                        {severities.selected && severities.selected.length
                          ? `${severities.selected
                              .slice(0, maxItemsToShow)
                              .map((item) => item.name)
                              .join(', ')
                              .toLowerCase()} ${
                              severities.selected.length > maxItemsToShow
                                ? `+${
                                    severities.selected.length - maxItemsToShow
                                  }`
                                : ''
                            }`
                          : t(
                              '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITY_ALL_LABEL'
                            )}
                      </SM>
                    </Accordion.Label>
                  </Accordion.Header>
                  <Accordion.Panel>
                    {severities.available
                      .slice(
                        0,
                        showMore.severities ? undefined : maxItemsToShow
                      )
                      .map((item) => (
                        <Field style={{ marginBottom: globalTheme.space.xs }}>
                          <Checkbox
                            value={item.name}
                            name="filter-severity"
                            checked={severities.selected
                              .map((i) => i.id)
                              .includes(item.id)}
                            onChange={() => {
                              dispatch(
                                updateFilters({
                                  filters: {
                                    severities: [
                                      ...(severities.selected
                                        .map((i) => i.id)
                                        .includes(item.id)
                                        ? severities.selected.filter(
                                            (i) => i.id !== item.id
                                          )
                                        : [...severities.selected, item]),
                                    ],
                                  },
                                })
                              );
                            }}
                          >
                            <Label
                              isRegular
                              style={{
                                color:
                                  globalTheme.colors.bySeverity[
                                    item.name.toLowerCase() as Severities
                                  ],
                                textTransform: 'capitalize',
                              }}
                            >
                              {item.name.toLowerCase()}
                            </Label>
                          </Checkbox>
                        </Field>
                      ))}
                    {severities.available.length > maxItemsToShow && (
                      <ShowMore
                        onClick={() => {
                          setShowMore({
                            ...showMore,
                            severities: !showMore.severities,
                          });
                        }}
                      >
                        {!showMore.severities ? (
                          <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITIES_SHOW_MORE_LABEL">
                            Show{' '}
                            <Span isBold>
                              {{
                                severities:
                                  severities.available.length - maxItemsToShow,
                              }}
                            </Span>{' '}
                            more severities
                          </Trans>
                        ) : (
                          t(
                            '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITIES_SHOW_LESS_LABEL'
                          )
                        )}
                      </ShowMore>
                    )}
                  </Accordion.Panel>
                </Accordion.Section>
              </Accordion>
              <Divider />
            </>
          )}

          {types.available.length && (
            <>
              <Accordion level={3}>
                <Accordion.Section>
                  <Accordion.Header>
                    <Accordion.Label>
                      <AccordionLabel isBold>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TYPOLOGY_TITLE'
                        )}
                      </AccordionLabel>
                      <SM
                        style={{
                          color: globalTheme.palette.grey[600],
                          textTransform: 'capitalize',
                        }}
                      >
                        {types.selected && types.selected.length
                          ? `${types.selected
                              .slice(0, maxItemsToShow)
                              .map((item) => item.name)
                              .join(', ')
                              .toLowerCase()} ${
                              types.selected.length > maxItemsToShow
                                ? `+${types.selected.length - maxItemsToShow}`
                                : ''
                            }`
                          : t(
                              '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TYPOLOGY_ALL_LABEL'
                            )}
                      </SM>
                    </Accordion.Label>
                  </Accordion.Header>
                  <Accordion.Panel>
                    {types.available
                      .slice(0, showMore.types ? undefined : maxItemsToShow)
                      .map((item) => (
                        <Field style={{ marginBottom: globalTheme.space.xs }}>
                          <Checkbox
                            value={item.name}
                            name="filter-typology"
                            checked={types.selected
                              .map((i) => i.id)
                              .includes(item.id)}
                            onChange={() => {
                              dispatch(
                                updateFilters({
                                  filters: {
                                    types: [
                                      ...(types.selected
                                        .map((i) => i.id)
                                        .includes(item.id)
                                        ? types.selected.filter(
                                            (i) => i.id !== item.id
                                          )
                                        : [...types.selected, item]),
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
                              {item.name.toLowerCase()}
                            </Label>
                          </Checkbox>
                        </Field>
                      ))}
                    {types.available.length > maxItemsToShow && (
                      <ShowMore
                        onClick={() => {
                          setShowMore({
                            ...showMore,
                            types: !showMore.types,
                          });
                        }}
                      >
                        {!showMore.types ? (
                          <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TYPOLOGY_SHOW_MORE_LABEL">
                            Show{' '}
                            <Span isBold>
                              {{
                                typologies:
                                  types.available.length - maxItemsToShow,
                              }}
                            </Span>{' '}
                            more typologies
                          </Trans>
                        ) : (
                          t(
                            '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TYPOLOGY_SHOW_LESS_LABEL'
                          )
                        )}
                      </ShowMore>
                    )}
                  </Accordion.Panel>
                </Accordion.Section>
              </Accordion>
              <Divider />
            </>
          )}

          {availableUseCases.length && (
            <>
              <Accordion level={3}>
                <Accordion.Section>
                  <Accordion.Header>
                    <Accordion.Label>
                      <AccordionLabel isBold>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_TITLE'
                        )}
                      </AccordionLabel>
                      <SM
                        style={{
                          color: globalTheme.palette.grey[600],
                          textTransform: 'capitalize',
                        }}
                      >
                        {useCases.selected && useCases.selected.length
                          ? `${useCases.selected
                              .slice(0, maxItemsToShow)
                              .map((item) => item.title.full)
                              .join(', ')
                              .toLowerCase()} ${
                              useCases.selected.length > maxItemsToShow
                                ? `+${
                                    useCases.selected.length - maxItemsToShow
                                  }`
                                : ''
                            }`
                          : t(
                              '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_ALL_LABEL'
                            )}
                      </SM>
                    </Accordion.Label>
                  </Accordion.Header>
                  <Accordion.Panel>
                    {availableUseCases
                      .slice(0, showMore.useCases ? undefined : maxItemsToShow)
                      .map((item) => (
                        <Field style={{ marginBottom: globalTheme.space.xs }}>
                          <Checkbox
                            value={item.id}
                            name="filter-usecase"
                            checked={useCases.selected
                              .map((i) => i.id)
                              .includes(item.id)}
                            onChange={() => {
                              dispatch(
                                updateFilters({
                                  filters: {
                                    useCases: [
                                      ...(useCases.selected
                                        .map((i) => i.id)
                                        .includes(item.id)
                                        ? useCases.selected.filter(
                                            (i) => i.id !== item.id
                                          )
                                        : [...useCases.selected, item]),
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
                    {availableUseCases.length > maxItemsToShow && (
                      <ShowMore
                        onClick={() => {
                          setShowMore({
                            ...showMore,
                            useCases: !showMore.useCases,
                          });
                        }}
                      >
                        {!showMore.useCases ? (
                          <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_SHOW_MORE_LABEL">
                            Show{' '}
                            <Span isBold>
                              {{
                                useCases:
                                  availableUseCases.length - maxItemsToShow,
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
          )}
        </>

        <>
          <MD
            isBold
            style={{
              color: globalTheme.palette.grey[600],
              marginBottom: globalTheme.space.sm,
              marginTop: globalTheme.space.md,
            }}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_BODY_ACTIONS_LABEL')}
          </MD>

          <>
            <Accordion level={3}>
              <Accordion.Section>
                <Accordion.Header>
                  <Accordion.Label>
                    <AccordionLabel isBold>
                      {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_TITLE')}
                    </AccordionLabel>
                    <SM
                      style={{
                        color: globalTheme.palette.grey[600],
                        textTransform: 'capitalize',
                      }}
                    >
                      {tags.selected && tags.selected.length
                        ? `${tags.selected
                            .slice(0, maxItemsToShow)
                            .map((item) => item.display_name)
                            .join(', ')
                            .toLowerCase()} ${
                            tags.selected.length > maxItemsToShow
                              ? `+${tags.selected.length - maxItemsToShow}`
                              : ''
                          }`
                        : t(
                            '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_ALL_LABEL'
                          )}
                    </SM>
                  </Accordion.Label>
                </Accordion.Header>
                <Accordion.Panel>
                  <Field style={{ marginBottom: globalTheme.space.xxs }}>
                    <Radio
                      value="all"
                      name="filter-tags"
                      checked={radioTags === 'all'}
                      onChange={() => {
                        setRadioTags('all');
                        dispatch(
                          updateFilters({
                            filters: {
                              tags: tags.available,
                            },
                          })
                        );
                      }}
                    >
                      <Label>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_ALL_LABEL'
                        )}
                      </Label>
                    </Radio>
                  </Field>
                  <Field style={{ marginBottom: globalTheme.space.xxs }}>
                    <Radio
                      value="contains"
                      name="filter-tags"
                      checked={radioTags === 'contains'}
                      onChange={() => {
                        setRadioTags('contains');
                        updateFilters({
                          filters: {
                            tags: tags.selected.map((i) => i.tag_id),
                          },
                        });
                      }}
                    >
                      <Label>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_CONTAINS_LABEL'
                        )}
                      </Label>
                    </Radio>
                    <TagsContainer>
                      {tags.available.length &&
                        radioTags === 'contains' &&
                        tags.available
                          .slice(0, showMore.tags ? undefined : maxItemsToShow)
                          .map((tag) => (
                            <Field
                              style={{ marginBottom: globalTheme.space.xs }}
                            >
                              <Checkbox
                                value={tag.tag_id}
                                name="filter-tags"
                                checked={tags.selected
                                  .map((i) => i.tag_id)
                                  .includes(tag.tag_id)}
                                onChange={() => {
                                  dispatch(
                                    updateFilters({
                                      filters: {
                                        tags: [
                                          ...(tags.selected
                                            .map((i) => i.tag_id)
                                            .includes(tag.tag_id)
                                            ? tags.selected.filter(
                                                (i) => i.tag_id !== tag.tag_id
                                              )
                                            : [...tags.selected, tag]),
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
                                  {tag.display_name.toLowerCase()}
                                </Label>
                              </Checkbox>
                            </Field>
                          ))}
                      {tags.available.length > maxItemsToShow &&
                        radioTags === 'contains' && (
                          <ShowMore
                            onClick={() => {
                              setShowMore({
                                ...showMore,
                                tags: !showMore.tags,
                              });
                            }}
                          >
                            {!showMore.tags ? (
                              <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAG_SHOW_MORE_LABEL">
                                Show{' '}
                                <Span isBold>
                                  {{
                                    tags:
                                      tags.available.length - maxItemsToShow,
                                  }}
                                </Span>{' '}
                                more tags
                              </Trans>
                            ) : (
                              t(
                                '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAG_SHOW_LESS_LABEL'
                              )
                            )}
                          </ShowMore>
                        )}
                    </TagsContainer>
                  </Field>
                  <Field>
                    <Radio
                      value="empty"
                      name="filter-tags"
                      checked={radioTags === 'empty'}
                      onChange={() => {
                        setRadioTags('empty');
                        dispatch(
                          updateFilters({
                            filters: {
                              tags: [],
                            },
                          })
                        );
                      }}
                    >
                      <Label>
                        {t(
                          '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_EMPTY_LABEL'
                        )}
                      </Label>
                    </Radio>
                  </Field>
                </Accordion.Panel>
              </Accordion.Section>
            </Accordion>
            <Divider />
          </>
        </>

        <>
          <MD
            isBold
            style={{
              color: globalTheme.palette.grey[600],
              marginBottom: globalTheme.space.sm,
              marginTop: globalTheme.space.md,
            }}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_BODY_BUG_LABEL')}
          </MD>

          <>
            <Accordion level={3}>
              <Accordion.Section>
                <Accordion.Header>
                  <Accordion.Label>
                    <AccordionLabel isBold>
                      {t(
                        '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_TITLE'
                      )}
                    </AccordionLabel>
                    <SM style={{ color: globalTheme.palette.grey[600] }}>
                      Value
                    </SM>
                  </Accordion.Label>
                </Accordion.Header>
                <Accordion.Panel>Options</Accordion.Panel>
              </Accordion.Section>
            </Accordion>
            <Divider />
          </>

          <>
            <Accordion level={3}>
              <Accordion.Section>
                <Accordion.Header>
                  <Accordion.Label>
                    <AccordionLabel isBold>
                      {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_TITLE')}
                    </AccordionLabel>
                    <SM style={{ color: globalTheme.palette.grey[600] }}>
                      Value
                    </SM>
                  </Accordion.Label>
                </Accordion.Header>
                <Accordion.Panel>Options</Accordion.Panel>
              </Accordion.Section>
            </Accordion>
            <Divider />
          </>

          <>
            <Accordion level={3}>
              <Accordion.Section>
                <Accordion.Header>
                  <Accordion.Label>
                    <AccordionLabel isBold>
                      {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_TITLE')}
                    </AccordionLabel>
                    <SM style={{ color: globalTheme.palette.grey[600] }}>
                      Value
                    </SM>
                  </Accordion.Label>
                </Accordion.Header>
                <Accordion.Panel>Options</Accordion.Panel>
              </Accordion.Section>
            </Accordion>
            <Divider />
          </>
        </>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button id="" isPill onClick={onResetClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_CANCEL_BUTTON')}
          </Button>
        </Drawer.FooterItem>
        <Drawer.FooterItem>
          <WaterButton id="" isPrimary isPill onClick={onCtaClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_CONFIRM_BUTTON')} ({bugsCount})
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="" onClick={onClose} />
    </Drawer>
  );
};

export { BugsFilterDrawer };
