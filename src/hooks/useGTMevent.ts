import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { useGetUsersMeQuery } from 'src/features/api';
import { useAnalytics } from 'use-analytics';
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
  const { data: userData } = useGetUsersMeQuery();

  const user = useAppSelector(
    () => ({
      role: userData?.role,
      customer_role: userData?.customer_role,
      tryber_wp_user_id: userData?.tryber_wp_user_id,
      id: userData?.id,
      name: userData?.name,
      email: userData?.email,
    }),
    shallowEqual
  );
  const { activeWorkspace } = useActiveWorkspace();
  const { track } = useAnalytics();

  const callback = useCallback(
    (data: GTMEventData) => {
      if (
        (loggedUser ? user : true) &&
        (loggedUser ? activeWorkspace : true) &&
        data
      ) {
        track(data?.event ?? '(not set)', {
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
        });
      }
    },
    [user, activeWorkspace]
  );

  return callback;
};
