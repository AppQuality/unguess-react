import queryString from 'query-string';

const WPAPI = {
  login: ({
    username,
    password,
    security,
  }: {
    username: string;
    password: string;
    security: string;
  }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const rp = urlParams.get('ugReverseProxy');

    return fetch(
      `${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php${
        typeof rp === 'undefined' ? '' : '?ugReverseProxy=1'
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          username,
          password,
          security,
          action: 'ajaxlogin',
        }),
      }
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.loggedin) {
          return true;
        }
        if (Object.prototype.hasOwnProperty.call(res, 'loggedin')) {
          throw new Error(
            JSON.stringify({ type: 'invalid', message: res.message })
          );
        }
        throw new Error(
          JSON.stringify({
            type: 'ajax_failed',
            message: 'There was an error, please reload',
          })
        );
      });
  },
  getNonce: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const rp = urlParams.get('ugReverseProxy');

    return fetch(
      `${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php${
        typeof rp === 'undefined' ? '' : '?ugReverseProxy=1'
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          action: 'ug_get_nonce',
        }),
      }
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          return res.data;
        }
        throw new Error('Nonce not found.');
      });
  },
  logout: () =>
    fetch(
      `${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php?action=unguess_wp_logout`,
      {
        method: 'GET',
      }
    )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e.message);
      }),
  getReport: ({ campaignId, title }: { campaignId: number; title: string }) => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: queryString.stringify({
        action: 'bugs_excel',
        project: campaignId,
        type: 'campaign',
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/themes/unguess/report/temp/${data.file}`;
        } else {
          // eslint-disable-next-line no-console
          console.error(data);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('error', error);
      });
  },
};

export default WPAPI;
