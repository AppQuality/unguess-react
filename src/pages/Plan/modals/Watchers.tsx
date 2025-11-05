import {
  Message,
  MultiSelect,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetPlansByPidWatchersQuery,
  useGetWorkspacesByWidUsersQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useTheme } from 'styled-components';

const useOptions = (planId: string) => {
  const [watchers, setWatchers] = useState<
    {
      id: number;
      label: string;
      selected: boolean;
    }[]
  >([]);
  const { activeWorkspace, isLoading: isActiveWorkspaceLoading } =
    useActiveWorkspace();
  const { data: users, isLoading: isLoadingUsers } =
    useGetWorkspacesByWidUsersQuery(
      {
        wid: (activeWorkspace?.id || '0').toString(),
      },
      {
        skip: !activeWorkspace?.id,
      }
    );
  const { data, isLoading } = useGetPlansByPidWatchersQuery({ pid: planId });
  useEffect(() => {
    if (data && users) {
      const watchersIds = (data?.items || []).map((watcher) => watcher.id);
      const options = (users?.items || []).map((user) => ({
        id: user.profile_id,
        label: `${user.name}`,
        selected: watchersIds.includes(user.profile_id),
      }));
      setWatchers(options);
    }
  }, [data, users]);

  if (isLoading || isLoadingUsers || isActiveWorkspaceLoading)
    return { options: [], select: () => {}, isLoading: true };

  return {
    options: watchers,
    select: (selected: number[]) =>
      setWatchers(
        watchers.map((w) => ({ ...w, selected: selected.includes(w.id) }))
      ),
    isLoading: false,
  };
};

const Watchers = ({
  onChange,
  planId,
}: {
  onChange: (selectedIds: number[]) => void;
  planId: string;
}) => {
  const { t } = useTranslation();
  const appTheme = useTheme();
  const { options, select, isLoading } = useOptions(planId);

  useEffect(() => {
    const selected = options.filter((item) => item.selected);
    onChange(selected.map((item) => Number(item.id)));
  }, [options]);

  if (isLoading) return <Skeleton width="100%" height="40px" />;

  return (
    <div>
      <MultiSelect
        listboxAppendToNode={document.body}
        options={options}
        size="small"
        maxItems={10}
        i18n={{
          placeholder: t('__PLAN_PAGE_MODAL_SEND_REQUEST_WATCHERS_PLACEHOLDER'),
        }}
        onChange={async (selectedItems) => {
          const selected = selectedItems.filter((item) => item.selected);
          select(selected.map((item) => Number(item.id)));
          onChange(selected.map((item) => Number(item.id)));
        }}
      />
      {options.filter((item) => item.selected).length === 0 && (
        <Message style={{ marginTop: appTheme.space.xs }} validation="error">
          {t('__PLAN_PAGE_MODAL_SEND_REQUEST_WATCHERS_ERROR')}
        </Message>
      )}
    </div>
  );
};

export { Watchers };
