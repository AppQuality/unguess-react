import {
  Autocomplete,
  DropdownFieldNew as DropdownField,
  ItemContent,
  Label,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { useGetTemplatesQuery } from 'src/features/api';
import { UseCaseTemplate } from 'src/features/api/api';
import i18n from 'src/i18n';

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

  if (!groupedTemplates) return null;

  return isLoading || isFetching ? (
    <Skeleton height="32px" width="100%" />
  ) : (
    <DropdownField>
      <Label>
        {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE')}
        <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
      </Label>
      <Autocomplete
        selectionValue={selectedItem?.id?.toString()}
        placeholder={t(
          '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
        )}
        onOptionClick={({ selectionValue }) => {
          const item = templates.find(
            (template) => template.id === Number(selectionValue)
          );
          if (!item || !item.title) return;
          onSelect(item);
        }}
        startIcon={<FunctionalityIcon />}
        options={(groupedTemplates || []).map((group) => {
          const category = group[0].category || { name: 'No category', id: 0 };
          return {
            id: (category.id || 0).toString(),
            label: category.name,
            options: group.map((template) => ({
              id: (template.id || 0).toString(),
              value: (template.id || 0).toString(),
              label: template.title,
              isSelected: selectedItem?.id === template.id,
              children: (
                <ItemContent
                  thumbSrc={template.image}
                  description={template.description}
                  label={template.title}
                />
              ),
            })),
          };
        })}
      />
    </DropdownField>
  );
};

interface TemplateDropdownProps {
  deviceType?: string;
  selectedItem?: UseCaseTemplate;
  onSelect: (item: UseCaseTemplate | undefined) => void;
}
