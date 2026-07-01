import { InputToggle } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePatchCampaignsByCidMutation } from 'src/features/api';

/**
 * Editable entity title shared by the campaign and hub entity pages. The title
 * is owned by the parent (passed via `title`) and persisted on blur through the
 * campaign patch endpoint, which also serves hubs (`allowHub`).
 */
export const EditableEntityTitle = ({
  entityId,
  title,
}: {
  entityId: string;
  title: string;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(title);
  const [patchEntity] = usePatchCampaignsByCidMutation();

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <InputToggle className="editable-title">
      <InputToggle.Item
        preventEmpty
        textSize="xxxl"
        maxLength={64}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={async (e) => {
          try {
            if (e.currentTarget.value && e.currentTarget.value !== title) {
              await patchEntity({
                cid: entityId,
                body: { customer_title: e.currentTarget.value },
              }).unwrap();
            }
          } catch {
            // eslint-disable-next-line
            alert(t('__CAMPAIGN_PAGE_UPDATE_CAMPAIGN_NAME_ERROR'));
          }
        }}
        style={{ paddingLeft: 0 }}
      />
    </InputToggle>
  );
};
