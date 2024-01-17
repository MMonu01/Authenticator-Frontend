import { GET_USER_DETAILS, LOGOUT } from "../reducers/login-slice";

import { Alertify } from "../scripts/Alertify";
import { ErrorExtractor } from "../scripts/Error-extractor";

export const GetUserSignup = (name, email, password) => (dispatch) => {
  return fetch(`http://localhost:9000/user/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((data) => {
      console.log("res", data);
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not signup ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
      return Promise.reject();
    });
};

export const GetUserLogin = (email, password) => (dispatch) => {
  return fetch(`http://localhost:9000/user/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then(() => {})
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not login ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
      return Promise.reject();
    });
};

export const GetUserDetails = () => (dispatch) => {
  fetch(`http://localhost:9000/user/userDetails`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      // console.log(data);
      if (data.logged_in_success) {
        dispatch(GET_USER_DETAILS(data));
      } else {
        dispatch(LOGOUT());
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        Alertify.error(`Could not get user details ${err}`);
      } else {
        err.text().then((err) => {
          const error_message = ErrorExtractor(err);
          Alertify.error(error_message);
        });
      }
    });
};
