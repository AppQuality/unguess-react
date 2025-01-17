import { ArchiveEmptyState } from './ArchiveEmptyState';
import { ProjectEmptyState } from './ProjectEmptyState';

export const EmptyProjectOrArchive = ({ isArchive }: { isArchive: boolean }) =>
  isArchive ? <ArchiveEmptyState /> : <ProjectEmptyState />;
