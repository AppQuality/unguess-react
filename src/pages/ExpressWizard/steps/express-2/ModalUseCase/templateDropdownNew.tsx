import {
  Autocomplete,
  DropdownFieldNew as DropdownField,
  Item,
  Label,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
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
    <DropdownField>
      <Label>
        {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE')}
        <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
      </Label>
      <Autocomplete startIcon={<FunctionalityIcon />} options={[]} />
    </DropdownField>
  );
};

interface TemplateDropdownProps {
  deviceType?: string;
  selectedItem?: UseCaseTemplate;
  onSelect: (item: UseCaseTemplate | undefined) => void;
}
