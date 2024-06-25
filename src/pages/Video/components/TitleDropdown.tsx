import {
  Autocomplete,
  Dropdown,
  Item,
  MediaBody,
  MediaFigure,
  Menu,
  Separator,
  Span,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useEffect, useState } from 'react';
import useDebounce from 'src/hooks/useDebounce';
import { ReactComponent as AddIcon } from 'src/assets/icons/grid-add.svg';
import { useTranslation } from 'react-i18next';
import {
  GetCampaignsByCidVideoTagsApiResponse,
  usePostCampaignsByCidVideoTagsMutation,
} from 'src/features/api';
import { useParams } from 'react-router-dom';
import { FormikProps } from 'formik';
import { appTheme } from 'src/app/theme';

export interface ObservationFormValues {
  title: number;
  severity: number;
  notes: string;
}

export const TitleDropdown = ({
  titles,
  title,
  formProps,
}: {
  titles?: GetCampaignsByCidVideoTagsApiResponse[number]['tags'];
  title?: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number];
  formProps: FormikProps<ObservationFormValues>;
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const [selectedItem, setSelectedItem] =
    useState<GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]>();
  const [inputValue, setInputValue] = useState('');
  const [matchingOptions, setMatchingOptions] = useState(titles);
  const debouncedInputValue = useDebounce<string>(inputValue, 300);
  const [addVideoTags] = usePostCampaignsByCidVideoTagsMutation();

  const filterMatchingOptions = (value: string) => {
    const matchedOptions = titles?.filter(
      (i) =>
        i.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
    );

    setMatchingOptions(matchedOptions);
  };

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
  }, [debouncedInputValue]);

  useEffect(() => {
    if (title) {
      setSelectedItem(title);
    }
  }, [title]);

  return (
    <Dropdown
      inputValue={inputValue}
      selectedItem={selectedItem}
      onSelect={(
        item: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]
      ) => {
        if (item)
          if (!item.id) {
            if (item.name.length > 40) {
              formProps.setErrors({
                title: t(
                  '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_MAX_ERROR'
                ),
              });
              setSelectedItem(item);
            } else {
              addVideoTags({
                cid: campaignId?.toString() || '0',
                body: {
                  group: {
                    name: 'title',
                  },
                  tag: {
                    name: inputValue,
                  },
                },
              })
                .unwrap()
                .then((res) => {
                  setSelectedItem(res.tag);
                  formProps.setFieldValue('title', res.tag.id);
                  setInputValue('');
                })
                .catch((err) => {
                  // eslint-disable-next-line no-console
                  console.error(err);
                });
            }
          } else {
            setInputValue('');
            setSelectedItem(item);
            formProps.setFieldValue('title', item.id);
          }
      }}
      onInputValueChange={(value) => {
        setInputValue(value);
      }}
      downshiftProps={{
        itemToString: (
          item: GetCampaignsByCidVideoTagsApiResponse[number]['tags'][number]
        ) => item && item.name,
      }}
    >
      <Field>
        <Autocomplete>
          {selectedItem ? (
            <Span>{selectedItem.name}</Span>
          ) : (
            <Span
              style={{
                opacity: 0.3,
                fontWeight: appTheme.fontWeights.semibold,
              }}
            >
              {t(
                '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_PLACEHOLDER'
              )}
            </Span>
          )}
        </Autocomplete>
      </Field>
      <Menu style={{ maxHeight: '205px' }}>
        {matchingOptions && matchingOptions.length ? (
          matchingOptions.map((item) => (
            <Item key={item.id} value={item}>
              <Span>
                {item.name} ({item.usageNumber})
              </Span>
            </Item>
          ))
        ) : (
          <Item disabled>
            <Span>
              {t(
                '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_NO_MATCHING_TITLES'
              )}
            </Span>
          </Item>
        )}
        {inputValue && (
          <>
            <Separator />
            <Item
              key="new"
              value={{
                name: inputValue,
              }}
            >
              <MediaFigure>
                <AddIcon />
              </MediaFigure>
              <MediaBody>
                {t('__WIZARD_EXPRESS_BODY_SELECT_PROJECT_ADD_ITEM_LABEL')}
                &nbsp; &quot;
                {inputValue}
                &quot;
              </MediaBody>
            </Item>
          </>
        )}
      </Menu>
    </Dropdown>
  );
};
