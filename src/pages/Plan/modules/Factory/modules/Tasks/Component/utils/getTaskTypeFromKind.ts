import { TTask } from '../hooks';

/**
 * Helper function to determine analytics taskType from task kind
 * @param kind - The task kind (bug, video, etc.)
 * @returns 'quality' for functional tasks, 'experience' for experiential tasks
 */
export const getTaskTypeFromKind = (
  kind: TTask['kind']
): 'quality' | 'experience' => {
  // Quality tasks (functional)
  if (kind === 'bug' || kind === 'explorative-bug') {
    return 'quality';
  }

  // Experience tasks (experiential)
  if (kind === 'video' || kind === 'moderate-video') {
    return 'experience';
  }

  // Default fallback (survey, accessibility, etc.)
  return 'quality';
};
