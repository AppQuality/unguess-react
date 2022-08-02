import {
  Label,
  theme as globalTheme,
  Span,
  Dropdown,
  Select,
  Menu,
  Item,
  ItemContent,
} from '@appquality/unguess-design-system';
import { Field as DropdownField } from '@zendeskgarden/react-dropdowns';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { useGetTemplatesQuery } from 'src/features/api';

import { UseCaseTemplate } from 'src/features/api/api';
import i18n from 'src/i18n';
import { useTranslation } from 'react-i18next';

export const TemplateDropdown = (props: TemplateDropdownProps) => {
  const { selectedItem, onSelect, deviceType } = props;
  const { t } = useTranslation();

  const templates = useGetTemplatesQuery({
    filterBy: {
      device_type: deviceType,
      locale: i18n.language,
    },
  });
  return (
    <Dropdown
      selectedItem={selectedItem}
      onSelect={onSelect}
      {...(!selectedItem && { validation: 'error' })}
    >
      <DropdownField>
        <Label>
          {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE')}
          <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
        </Label>
        <Select start={<FunctionalityIcon />}>
          {selectedItem ??
            t(
              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
            )}
        </Select>
      </DropdownField>
      <Menu>
        {templates.data &&
          templates.data.map((template: UseCaseTemplate) => (
            <Item key={`template_${template.id}`} value={template.title}>
              <ItemContent
                thumbSrc={template.image}
                description={template.description}
                label={template.title}
              />
            </Item>
          ))}
      </Menu>
    </Dropdown>
  );
};

interface TemplateDropdownProps {
  deviceType?: string;
  selectedItem?: string;
  onSelect: (item: string) => void;
}
