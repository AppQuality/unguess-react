import { useCallback } from 'react';
import TagManager from 'react-gtm-module';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { useActiveWorkspace } from './useActiveWorkspace';

interface GTMEventData {
  event: string;
  category?: string;
  content?: string;
  action?: string;
  target?: string;
}

export const useSendGTMevent = () => {
  const user = useAppSelector(
    (state) => ({
      role: state.user.userData.role,
      tryber_wp_user_id: state.user.userData.tryber_wp_user_id,
      id: state.user.userData.id,
      name: state.user.userData.name,
      email: state.user.userData.email,
    }),
    shallowEqual
  );
  const { activeWorkspace } = useActiveWorkspace();

  const callback = useCallback(
    (data: GTMEventData) => {
      if (user && activeWorkspace && data) {
        TagManager.dataLayer({
          dataLayer: {
            role: user.role,
            wp_user_id: user.tryber_wp_user_id,
            tester_id: user.id,
            name: user.name,
            email: user.email,
            company: activeWorkspace.company,
            event: data?.event ?? '(not set)',
            content: data?.content ?? '(not set)',
            category: data?.category ?? '(not set)',
            action: data?.action ?? '(not set)',
            target: data?.target ?? '(not set)',
          },
        });
      }
    },
    [user, activeWorkspace]
  );

  return callback;
};
