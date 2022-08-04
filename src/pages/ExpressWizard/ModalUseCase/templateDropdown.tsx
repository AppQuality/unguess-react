import {
  Label,
  theme as globalTheme,
  Span,
  Dropdown,
  Menu,
  Item,
  ItemContent,
  Autocomplete,
  Skeleton,
  Separator,
  MediaFigure,
  MediaBody,
} from '@appquality/unguess-design-system';
import { Field as DropdownField } from '@zendeskgarden/react-dropdowns';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { useGetTemplatesQuery } from 'src/features/api';
import { ReactComponent as AddIcon } from 'src/assets/icons/grid-add.svg';
import { UseCaseTemplate } from 'src/features/api/api';
import i18n from 'src/i18n';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from 'src/hooks/useDebounce';

export const TemplateDropdown = (props: TemplateDropdownProps) => {
  const { selectedItem, onSelect, deviceType } = props;
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useGetTemplatesQuery({
    filterBy: {
      device_type: deviceType,
      locale: i18n.language,
    },
  });

  const templates = data || [];

  const [inputValue, setInputValue] = useState<string>('');
  const [matchingOptions, setMatchingOptions] = useState(templates);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);

  const filterMatchingOptions = useCallback(
    (value: string) => {
      const matchedOptions = templates.filter(
        (tmpl) =>
          tmpl.title
            .trim()
            .toLowerCase()
            .indexOf(value.trim().toLowerCase()) !== -1
      );

      setMatchingOptions(matchedOptions);
    },
    [templates]
  );

  useEffect(() => {
    filterMatchingOptions(debouncedInputValue);
  }, [debouncedInputValue, templates]);

  return isLoading || isFetching ? (
    <Skeleton height="32px" width="100%" />
  ) : (
    <Dropdown
      selectedItem={selectedItem}
      onSelect={(item: UseCaseTemplate) => {
        if (item.id === -1) {
          setInputValue(item.title);
        } else {
          setInputValue('');
        }

        onSelect(item);
      }}
      {...(!selectedItem && { validation: 'error' })}
      onInputValueChange={(value) => {
        setInputValue(value);
      }}
      downshiftProps={{
        itemToString: (item: UseCaseTemplate) => item?.title || '',
      }}
    >
      <DropdownField>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE')}
          <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
        </Label>
        <Autocomplete start={<FunctionalityIcon />}>
          {selectedItem?.title ??
            t(
              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
            )}
        </Autocomplete>
      </DropdownField>
      <Menu>
        {matchingOptions.length ? (
          matchingOptions.map((item: UseCaseTemplate) => (
            <Item key={`template_${item.id}`} value={item}>
              <ItemContent
                thumbSrc={item.image}
                description={item.description}
                label={item.title}
              />
            </Item>
          ))
        ) : (
          <Item disabled>
            <span>
              {t(
                '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_NO_RESULTS'
              )}
            </span>
          </Item>
        )}
        {inputValue && (
          <>
            <Separator />
            <Item key="new" value={{ id: -1, title: inputValue }}>
              <MediaFigure>
                <AddIcon />
              </MediaFigure>
              <MediaBody>
                {t(
                  '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_ADD_ITEM_LABEL'
                )}
                &nbsp; &quot;
                {inputValue}&quot;
              </MediaBody>
            </Item>
          </>
        )}
      </Menu>
    </Dropdown>
  );
};

interface TemplateDropdownProps {
  deviceType?: string;
  selectedItem?: UseCaseTemplate;
  onSelect: (item: UseCaseTemplate | undefined) => void;
}
