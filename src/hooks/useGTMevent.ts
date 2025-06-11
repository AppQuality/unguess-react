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

export const useSendGTMevent = ({
  loggedUser = true,
}: { loggedUser?: boolean } = {}) => {
  const user = useAppSelector(
    (state) => ({
      role: state.user.userData.role,
      customer_role: state.user.userData.customer_role,
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
      if (
        (loggedUser ? user : true) &&
        (loggedUser ? activeWorkspace : true) &&
        data
      ) {
        console.log('GTM Event Data sent');
        TagManager.dataLayer({
          dataLayer: {
            role: user.role,
            customer_role: user.customer_role,
            wp_user_id: user.tryber_wp_user_id,
            tester_id: user.id,
            name: user.name,
            email: user.email,
            company: activeWorkspace?.company,
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
