import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { useActiveWorkspace } from './useActiveWorkspace';

const useActiveWorkspaceProjects = () => {
  const { activeWorkspace } = useActiveWorkspace();

  if (!activeWorkspace)
    return {
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
    };

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidProjectsQuery({
      wid: activeWorkspace?.id.toString() || '',
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

export { useActiveWorkspaceProjects };
