import queryString from "query-string";
import Cookies from "universal-cookie";

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
    return fetch(
      `${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: queryString.stringify({
          username,
          password,
          security,
          action: "ajaxlogin",
        }),
      }
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.loggedin) {
          return true;
        }
        if (res.hasOwnProperty("loggedin")) {
          throw new Error(
            JSON.stringify({ type: "invalid", message: res.message })
          );
        }
        throw new Error(
          JSON.stringify({
            type: "ajax_failed",
            message: "There was an error, please reload",
          })
        );
      });
  },
  getNonce: () => {
    return fetch(
      `${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: queryString.stringify({
          action: "ug_get_nonce",
        }),
      }
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Nonce not found.");
      });
  }
};

export default WPAPI;
