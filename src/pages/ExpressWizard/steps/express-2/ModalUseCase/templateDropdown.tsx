import {
  Autocomplete,
  Dropdown,
  DropdownField,
  Item,
  ItemContent,
  Label,
  MediaBody,
  MediaFigure,
  Menu,
  Separator,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { ReactComponent as AddIcon } from 'src/assets/icons/grid-add.svg';
import { useGetTemplatesQuery } from 'src/features/api';
import { UseCaseTemplate } from 'src/features/api/api';
import useDebounce from 'src/hooks/useDebounce';
import i18n from 'src/i18n';
import styled from 'styled-components';

const StyledItem = styled(Item)`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};

  &:first-child {
    margin-top: 0;
  }
`;

const GroupLabel = styled(StyledItem)`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:not(:first-child) {
    margin-top: ${({ theme }) => theme.space.sm};
  }
`;

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

  // Group templates by category id
  const groupedTemplates = templates.reduce(
    (acc: UseCaseTemplate[][], template: UseCaseTemplate) => {
      const categoryId = template?.category?.id ?? -1;
      if (!acc[categoryId as number]) {
        acc[categoryId as number] = [];
      }

      acc[categoryId as number].push(template);
      return acc;
    },
    []
  );

  const [inputValue, setInputValue] = useState<string>('');
  const [matchingOptions, setMatchingOptions] = useState(groupedTemplates);

  const debouncedInputValue = useDebounce<string>(inputValue, 300);

  const filterMatchingOptions = useCallback(
    (value: string) => {
      const matchedOptions = groupedTemplates.reduce(
        (acc: UseCaseTemplate[][], group: UseCaseTemplate[]) => {
          const categoryId = group[0]?.category?.id ?? -1;
          const matchGroup = group.filter(
            (template: UseCaseTemplate) =>
              template.title
                .trim()
                .toLowerCase()
                .indexOf(value.trim().toLowerCase()) !== -1
          );
          if (matchGroup.length) {
            acc[categoryId as number] = matchGroup;
          }
          return acc;
        },
        []
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
        if (!item) return;

        if (item.id === -1) {
          setInputValue(item.title);
        } else {
          setInputValue('');
        }

        if (item.title) {
          onSelect(item);
        }
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
          <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
        </Label>
        <Autocomplete start={<FunctionalityIcon />}>
          {selectedItem?.title ??
            t(
              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
            )}
        </Autocomplete>
      </DropdownField>
      <Menu style={{ maxHeight: '250px' }}>
        {matchingOptions.length ? (
          matchingOptions.map((group: UseCaseTemplate[]) => (
            <>
              <GroupLabel disabled>{group[0]?.category?.name}</GroupLabel>
              {group.map((template: UseCaseTemplate) => (
                <StyledItem key={`template_${template.id}`} value={template}>
                  <ItemContent
                    thumbSrc={template.image}
                    description={template.description}
                    label={template.title}
                  />
                </StyledItem>
              ))}
            </>
          ))
        ) : (
          <StyledItem disabled>
            <span>
              {t(
                '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_NO_RESULTS'
              )}
            </span>
          </StyledItem>
        )}
        {inputValue && (
          <>
            <Separator />
            <StyledItem key="new" value={{ id: -1, title: inputValue }}>
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
            </StyledItem>
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
