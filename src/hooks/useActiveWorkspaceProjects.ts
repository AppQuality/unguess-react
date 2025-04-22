import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { useActiveWorkspace } from './useActiveWorkspace';

const useActiveWorkspaceProjects = () => {
  const { activeWorkspace } = useActiveWorkspace();

  const { data, isLoading, isFetching, isError } =
    useGetWorkspacesByWidProjectsQuery({
      wid: activeWorkspace?.id.toString() || '',
    });
  // If there is no active workspace, we return an empty object
  if (!activeWorkspace)
    return {
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
    };

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

export { useActiveWorkspaceProjects };
