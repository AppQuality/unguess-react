import { ArchiveEmptyState } from './archiveEmptyState';
import { ProjectEmptyState } from './projectEmptyState';

export const EmptyProjectOrArchive = ({ isArchive }: { isArchive: boolean }) =>
  isArchive ? <ArchiveEmptyState /> : <ProjectEmptyState />;
