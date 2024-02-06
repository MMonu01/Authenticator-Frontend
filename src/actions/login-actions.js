import { GET_USER_DETAILS, LOGOUT, login_SET_USER_STATUS } from "../reducers/login-slice";

import { Alertify } from "../scripts/Alertify";
import { ErrorExtractor } from "../scripts/Error-extractor";

export const LoginVerifyUser = (email) => (dispatch) => {
  return fetch(`http://localhost:9000/user/verify-user`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      console.log("data", data);
      let show_component = "new";
      if (data.is_registered) {
        show_component = "existing";
      }
      dispatch(login_SET_USER_STATUS({ show_component, email }));
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

export const RequestOtp = () => (dispatch, getState) => {
  const { login_store } = getState();
  const { email } = login_store;
  return fetch(`http://localhost:9000/user/request-otp`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((data) => {})
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

export const SendEmailLink = () => (dispatch, getState) => {
  const { login_store } = getState();
  const { email } = login_store;

  return fetch(`http://localhost:9000/user/send-email-link`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((data) => {})
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

export const VerifyEmail = (token) => (dispatch, getState) => {
  return fetch(`http://localhost:9000/user/verify-email`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((data) => {})
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

export const GetUserSignup = (name, password, otp) => (dispatch, getState) => {
  const { login_store } = getState();
  const { email } = login_store;

  return fetch(`http://localhost:9000/user/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, otp }),
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

export const GetUserLogin = (otp, password) => (dispatch, getState) => {
  const { login_store } = getState();
  const { email } = login_store;

  return fetch(`http://localhost:9000/user/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, password }),
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

export const GoogleLogin = (token) => (dispatch, getState) => {
  return fetch(`http://localhost:9000/user/google-login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
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
