import { fetchAuthSession } from 'aws-amplify/auth';
import { isDev } from 'src/common/isDevEnvironment';

export const syncWordpress = async (): Promise<void> => {
  const session = await fetchAuthSession();

  const idToken = session.tokens?.idToken?.toString();

  if (!idToken) {
    // eslint-disable-next-line no-console
    console.error('SyncWP: No ID token available');
    return;
  }

  const response = await fetch(
    `${process.env.REACT_APP_CROWD_WP_URL}/wp-json/cognito-sync/v1/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id_token: idToken }),
    }
  );

  const result = await response.json();
  if (isDev()) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ syncWordpress ~ result:', result);
  }
};
