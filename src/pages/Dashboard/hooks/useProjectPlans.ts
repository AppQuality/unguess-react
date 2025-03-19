import { useGetWorkspacesByWidPlansQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';

export const useProjectPlans = ({ projectId }: { projectId: number }) => {
  const { activeWorkspace } = useActiveWorkspace();
  const canSeePlans = useCanAccessToActiveWorkspace();

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidPlansQuery(
      {
        wid: activeWorkspace?.id.toString() || '',
        orderBy: 'start_date',
        order: 'DESC',
        filterBy: {
          project: projectId.toString(),
        },
      },
      {
        skip: !canSeePlans || !activeWorkspace,
      }
    );

  return {
    isLoading,
    isFetching,
    isError,
    items: data || [],
  };
};
