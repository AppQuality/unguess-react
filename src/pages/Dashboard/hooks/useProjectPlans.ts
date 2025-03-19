import { useGetWorkspacesByWidPlansQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

export const useProjectPlans = ({ projectId }: { projectId: number }) => {
  const { activeWorkspace } = useActiveWorkspace();

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
        skip: !activeWorkspace,
      }
    );

  return {
    isLoading,
    isFetching,
    isError,
    items: data || [],
  };
};
