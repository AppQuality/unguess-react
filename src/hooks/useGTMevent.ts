import { useCallback } from 'react';
import TagManager from 'react-gtm-module';
import { useAppSelector } from 'src/app/hooks';
import { useActiveWorkspace } from './useActiveWorkspace';

export interface GTMEventData {
  event: string;
  category?: string;
  content?: string;
  action?: string;
  target?: string;
}

export const useSendGTMevent = () => {
  const { userData: user } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useActiveWorkspace();

  const callback = useCallback(
    (data: GTMEventData) => {
      if (user && activeWorkspace && data) {
        TagManager.dataLayer({
          dataLayer: {
            event: data?.event,
            role: user.role,
            wp_user_id: user.tryber_wp_user_id,
            tester_id: user.id,
            name: user.name,
            email: user.email,
            company: activeWorkspace.company,
            ...(data?.content && { content: data.content }),
            ...(data?.category && { category: data.category }),
            ...(data?.action && { action: data.action }),
            ...(data?.target && { target: data.target }),
          },
        });
      }
    },
    [user, activeWorkspace]
  );

  return callback;
};
