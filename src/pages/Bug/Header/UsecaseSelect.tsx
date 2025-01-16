import { Ellipsis, Select } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SelectedItem } from 'src/common/components/BugDetail/BugStateSelect';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { BugByUsecaseType } from 'src/pages/Bugs/Content/BugsTable/types';

export const UsecaseSelect = ({
  usecases,
}: {
  usecases: BugByUsecaseType[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sendGTMEvent = useSendGTMevent();
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const renderOptions = useMemo(
    () =>
      usecases.map(({ useCase, bugs }) => (
        <Select.Option
          key={useCase.id}
          value={useCase.id.toString()}
          isDisabled={bugs.length === 0}
        >
          <Ellipsis style={{ width: 220 }}> {useCase.title.full}</Ellipsis>

          <Select.Option.Meta>
            {t('{{count}} bugs', { count: bugs.length })}
          </Select.Option.Meta>
        </Select.Option>
      )),
    [usecases]
  );

  return (
    <div style={{ width: '270px' }}>
      <Select
        renderValue={(value) => {
          const selectedStatus = usecases.find(
            (u) => u.useCase.id === Number(value.inputValue)
          );
          return (
            <SelectedItem>
              <Ellipsis>{selectedStatus?.useCase.title.full}</Ellipsis>
            </SelectedItem>
          );
        }}
        isCompact
        inputValue={searchParams.get('groupByValue') || ''}
        selectionValue={searchParams.get('groupByValue') || ''}
        onSelect={async (usecaseId) => {
          const target = usecases.find(
            (u) => u.useCase.id === Number(usecaseId)
          )?.bugs[0].id;
          searchParams.set('groupByValue', usecaseId);

          sendGTMEvent({
            event: 'bug_header_action',
            action: 'change_usecase',
            target: target?.toString() || 'target_not_found',
          });

          if (target) {
            navigate(
              `/campaigns/${campaignId}/bugs/${target}?${searchParams.toString()}`
            );
          }
        }}
      >
        {renderOptions}
      </Select>
    </div>
  );
};
