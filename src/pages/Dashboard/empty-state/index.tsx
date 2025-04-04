import { ArchiveEmptyState } from './archiveEmptyState';
import { ProjectEmptystateContextProvider } from './Context';
import { ProjectEmptyState } from './projectEmptyState';

export const EmptyProjectOrArchive = ({
  isArchive,
}: {
  isArchive: boolean;
}) => (
  <ProjectEmptystateContextProvider>
    {isArchive ? <ArchiveEmptyState /> : <ProjectEmptyState />}
  </ProjectEmptystateContextProvider>
);
