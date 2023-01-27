import { useCallback, useState } from 'react';
import queryString from 'query-string';

export const useShareBug = ({ bid }: { bid: number }) => {
  const [link, setLink] = useState<string | undefined>(undefined);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const createLink = useCallback(() => {
    setisLoading(true);
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: queryString.stringify({
        action: 'create_public_link',
        bug_id: bid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success || !data.link) {
          throw new Error('Could not create link');
        }

        setLink(data.link as string);
      })
      .catch(setError)
      .finally(() => setisLoading(false));
  }, [bid]);

  return {
    createLink,
    link,
    isLoading,
    isError: error !== undefined,
    Error: error,
  };
};
