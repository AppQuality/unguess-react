import { Label, MD, Toggle } from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { GetCampaignsByCidObservationsApiArg } from 'src/features/api';

interface Props {
  groupBy: GetCampaignsByCidObservationsApiArg['groupBy'];
  setGroupBy: (value: GetCampaignsByCidObservationsApiArg['groupBy']) => void;
}

export const GroupByToggle = ({ groupBy, setGroupBy }: Props) => {
  const { t } = useTranslation();
  return (
    <Field>
      <Toggle
        checked={groupBy === 'usecase-grapes'}
        onChange={(event) =>
          setGroupBy(event.target.checked ? 'usecase-grapes' : undefined)
        }
      >
        <Label isRegular>
          <MD>{t('__INSIGHTS_PAGE_COLLECTION_GROUP_BY_USECASE')}</MD>
        </Label>
      </Toggle>
    </Field>
  );
};
