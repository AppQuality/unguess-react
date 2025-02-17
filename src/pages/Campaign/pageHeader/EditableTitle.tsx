import { InputToggle } from '@appquality/unguess-design-system';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetCampaignsByCidQuery,
  usePatchCampaignsByCidMutation,
} from 'src/features/api';

export const EditableTitle = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId?.toString() ?? '0',
  });
  const [itemTitle, setItemTitle] = useState<string>(
    campaign?.customer_title ?? ''
  );

  const [patchCampaign] = usePatchCampaignsByCidMutation();

  const InputToggleMemo = useMemo(
    () => (
      <InputToggle className="editable-title">
        <InputToggle.Item
          preventEmpty
          textSize="xxxl"
          maxLength={64}
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          onBlur={async (e) => {
            try {
              if (
                e.currentTarget.value &&
                e.currentTarget.value !== campaign?.customer_title
              ) {
                await patchCampaign({
                  cid: campaignId?.toString() ?? '0',
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
    ),
    [campaign, itemTitle]
  );

  return InputToggleMemo;
};
