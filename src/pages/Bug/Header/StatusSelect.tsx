import { Ellipsis, Select } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SelectedItem } from 'src/common/components/BugDetail/BugStateSelect';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { BugByStateType } from 'src/pages/Bugs/Content/BugsTable/types';

export const StatusSelect = ({ statuses }: { statuses: BugByStateType[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sendGTMEvent = useSendGTMevent();
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const renderOptions = useMemo(
    () =>
      statuses.map(({ state, bugs }) => (
        <Select.Option
          key={state.id}
          value={state.id.toString()}
          isDisabled={bugs.length === 0}
        >
          {getCustomStatusInfo(state.name as BugState, t).text}
          <Select.Option.Meta>
            {' '}
            {t('{{count}} bugs', { count: bugs.length })}
          </Select.Option.Meta>
        </Select.Option>
      )),
    [statuses]
  );

  return (
    <div style={{ width: '270px' }}>
      <Select
        data-qa="status-select"
        renderValue={(value) => {
          const selectedStatus = statuses.find(
            (u) => u.state.id === Number(value.inputValue)
          );
          return (
            <SelectedItem>
              <Ellipsis>
                {selectedStatus
                  ? getCustomStatusInfo(
                      selectedStatus.state.name as BugState,
                      t
                    ).text
                  : ''}
              </Ellipsis>
            </SelectedItem>
          );
        }}
        isCompact
        inputValue={searchParams.get('groupByValue') || ''}
        selectionValue={searchParams.get('groupByValue') || ''}
        onSelect={async (stateId) => {
          const target = statuses.find((u) => u.state.id === Number(stateId))
            ?.bugs[0].id;
          searchParams.set('groupByValue', stateId);

          sendGTMEvent({
            event: 'bug_header_action',
            action: 'change_status',
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
